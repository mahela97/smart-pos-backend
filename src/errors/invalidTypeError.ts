import { SystemError } from "./systemError";
import { ErrorResponse } from "./errorResponce";

export class InvalidType extends SystemError {
  constructor(private desc?: string) {
    super("Argument type is invalid");
    Object.setPrototypeOf(this, InvalidType.prototype);
  }

  get error(): ErrorResponse {
    return ErrorResponse.paramTypeError(this.desc);
  }
}
