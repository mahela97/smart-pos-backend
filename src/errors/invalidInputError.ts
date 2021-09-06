import { SystemError } from "./systemError";
import { ErrorResponse } from "./errorResponce";

export class InvalidInput extends SystemError {
  constructor(private desc?: string) {
    super("Input data is invalid");
    Object.setPrototypeOf(this, InvalidInput.prototype);
  }
  get error(): ErrorResponse {
    return ErrorResponse.invalidInputData(this.desc);
  }
}
