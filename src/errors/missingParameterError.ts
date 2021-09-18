import { SystemError } from "./systemError";
import { ErrorResponse } from "./errorResponce";

export class MissingParameter extends SystemError {
  constructor(private desc?: string) {
    super(`Some required parameters are Missing`);
    Object.setPrototypeOf(this, MissingParameter.prototype);
  }

  get error(): ErrorResponse {
    return ErrorResponse.paramTypeError(this.desc);
  }
}
