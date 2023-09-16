import ExecutionContext from "../execution";
import { NotImplementedError } from "./errors";

const defaultExecute = () => {
  throw new NotImplementedError();
}

class Instruction {
  public readonly opCode: number;
  public readonly name: string;
  public readonly execute: (ctx: ExecutionContext) => void;

  constructor(
    opCode: number,
    name: string,
    execute: (ctx: ExecutionContext) => void = defaultExecute,
  ) {
    this.opCode = opCode;
    this.name = name;
    this.execute = execute;
  }
}

export default Instruction;
