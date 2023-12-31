/** @format */

import { arrayify, hexlify, isHexString } from '@ethersproject/bytes'
import {
  InvalidBytecode,
  InvalidProgramCounterIndex,
  UnknownOpCode,
} from './errors'
import Memory from '../memory'
import Stack from '../stack'
import Instruction from '../instruction'
import OpCodes from '../../opcodes'
import { Trie } from '@ethereumjs/trie'

class ExecutionContext {
  private readonly code: Uint8Array

  private programCounter: number
  private stopped: boolean

  public stack: Stack
  public memory: Memory
  public output: bigint = BigInt(0)
  public storage: Trie

  constructor(code: string, storage: Trie) {
    if (!isHexString(code) || code.length % 2 !== 0) throw new InvalidBytecode()

    this.code = arrayify(code)
    this.stack = new Stack()
    this.memory = new Memory()
    this.programCounter = 0
    this.stopped = false
    this.storage = storage
  }

  public stop(): void {
    this.stopped = true
  }

  public async run(): Promise<void> {
    while (!this.stopped) {
      const currentProgramCounter = this.programCounter

      const instruction = this.fetchInstruction()
      await instruction.execute(this)

      console.info(`${instruction.name}\t @pc = ${currentProgramCounter}`)

      this.memory.print()
      this.stack.print()
      console.log('')
    }

    console.log('Output:\t', hexlify(this.output))
    console.log('Root:\t', hexlify(this.storage.root()))
  }

  private fetchInstruction(): Instruction {
    if (this.programCounter >= this.code.length) return OpCodes[0]

    if (this.programCounter < 0) throw new InvalidProgramCounterIndex()

    const opCode = this.readBytesFromCode()

    const instruction = OpCodes[Number(opCode)]

    if (!instruction) throw new UnknownOpCode()

    return instruction
  }

  public readBytesFromCode(bytes = 1): bigint {
    const hexValues = this.code.slice(
      this.programCounter,
      this.programCounter + bytes,
    )

    const values = BigInt(hexlify(hexValues))

    this.programCounter += bytes

    return values
  }
}

export default ExecutionContext
