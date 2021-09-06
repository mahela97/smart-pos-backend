export class ErrorResponse {
  public readonly status = "error";

  constructor(
    public message: string,
    public code: number,
    public description?: string
  ) {}

  get response(): any {
    return {
      message: this.message,
      description: this.description,
    };
  }

  static voidError(message?: string, code?: number, description?: string) {
    return new ErrorResponse(
      message ?? "Unexpected error",
      code ?? 422,
      description ?? "Unexpected error in the cloud function"
    );
  }

  static notAuth(description?: string) {
    return new ErrorResponse("User not authorized", 1, description);
  }

  static notEnoughParams(description?: string) {
    return new ErrorResponse(
      "Not enough parameters are given",
      422,
      description
    );
  }

  static paramTypeError(description?: string) {
    return new ErrorResponse(
      "Parameters are not in the correct type",
      422,
      description
    );
  }

  static refNotFount(description?: string) {
    return new ErrorResponse("Reference not fount", 422, description);
  }

  static undefinedSnapshot(description?: string) {
    return new ErrorResponse("Undefined Snapshot", 4, description);
  }

  static missingRequiredData(description?: string) {
    return new ErrorResponse("Missing Required Data", 422, description);
  }

  static invalidInputData(description?: string, data?: object[]) {
    return new ErrorResponse("Invalid Input Data", 422, description);
  }
}
