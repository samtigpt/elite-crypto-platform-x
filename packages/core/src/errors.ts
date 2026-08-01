export class ECPXError extends Error {
  public readonly code: string;

  constructor(
    code: string,
    message: string
  ) {
    super(message);

    this.name = "ECPXError";
    this.code = code;

    Object.setPrototypeOf(
      this,
      ECPXError.prototype
    );
  }
}

export function isECPXError(
  error: unknown
): error is ECPXError {
  return error instanceof ECPXError;
}