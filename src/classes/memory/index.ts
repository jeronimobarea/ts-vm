import { MAX_UINT256 } from "../../constants";

class Memory {
  private memory: bigint[];

  constructor() {
    this.memory = [];
  }

  public store(offset: bigint, value: bigint): void {
    if (offset < 0 || offset > MAX_UINT256)
  }

  public load(offset: bigint): bigint {
    
  }
}