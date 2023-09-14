class OffsetValueError extends Error {
  constructor(offset: bigint, value: bigint) {
    super(`Invalid memory access for offset: ${offset} and value: ${value}`);
  }
}

class InvalidMemoryOffset extends OffsetValueError {}

class InvalidMemoryValue extends OffsetValueError {}

export { OffsetValueError, InvalidMemoryOffset, InvalidMemoryValue };
