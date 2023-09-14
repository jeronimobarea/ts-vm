import { arrayify, hexlify, isHexString } from "@ethersproject/bytes";
import Memory from "../memory";
import Stack from "../stack";
import { InvalidBytecode } from "./errors";

class ExecutionContext {
  private readonly code: Uint8Array;

  public stack: Stack;
  public memory: Memory;

  private programCounter: number;
  private stopped: boolean;

  constructor(code: string) {
    if (!isHexString(code) || code.length % 2 !== 0)
      throw new InvalidBytecode();

    this.code = arrayify(code);
    this.stack = new Stack();
    this.memory = new Memory();
    this.programCounter = 0;
    this.stopped = false;
  }

  public stop(): void {
    this.stopped = true;
  }

  public run(): void {
    while (!this.stopped) {
      const opCode = this.readBytesFromCode();

      // TODO: Execute opCode
    }
  }

  public readBytesFromCode(bytes = 1): bigint {
    const hexValues = this.code.slice(
      this.programCounter,
      this.programCounter + bytes,
    );

    const values = BigInt(hexlify(hexValues));

    this.programCounter += bytes;

    return values;
  }
}

export default ExecutionContext;
