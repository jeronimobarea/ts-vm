class InvalidStackValue extends Error {
  constructor(value: bigint) {
    super(`Invalid ${value}`);
  }
}

class StackOverflow extends Error { }

class StackUnderflow extends Error { }

export { InvalidStackValue, StackOverflow, StackUnderflow };
