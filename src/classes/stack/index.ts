/** @format */

import { hexlify } from '@ethersproject/bytes'
import { MAX_UINT256 } from '../../constants'
import {
  IndexOutOfBounds,
  InvalidStackValue,
  StackOverflow,
  StackUnderflow,
} from './errors'

class Stack {
  private readonly maxDepth
  private stack: bigint[]

  constructor(maxDepth = 1024) {
    this.maxDepth = maxDepth
    this.stack = []
  }

  public push(value: bigint): void {
    if (value < 0 || value > MAX_UINT256) throw new InvalidStackValue(value)

    if (this.stack.length + 1 > this.maxDepth) throw new StackOverflow()

    this.stack.push(value)
  }

  public pop(): bigint {
    const value = this.stack.pop()

    if (value == undefined) throw new StackUnderflow()

    return value
  }

  public swap(indexA: number, indexB: number): void {
    const adjustedIndexA = this.toStackIndex(indexA)
    const adjustedIndexB = this.toStackIndex(indexB)

    const a = this.stack[adjustedIndexA]
    if (a === undefined) throw new IndexOutOfBounds()

    const b = this.stack[adjustedIndexB]
    if (b === undefined) throw new IndexOutOfBounds()

    this.stack[adjustedIndexA] = b
    this.stack[adjustedIndexB] = a
  }

  public duplicate(index: number): void {
    const value = this.stack[this.toStackIndex(index)]
    if (value === undefined) throw new IndexOutOfBounds()

    this.stack.push(value)
  }

  private toStackIndex(index: number): number {
    return this.stack.length - index
  }

  public print(): void {
    console.log(
      `Stack:\t `,
      this.stack.map((v) => hexlify(v)),
    )
  }
}

export default Stack
