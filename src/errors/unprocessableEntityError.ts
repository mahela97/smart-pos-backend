import BaseError from "./baseError";

export default class UnprocessableEntityError extends BaseError {
  constructor() {
    super(422, "Unprocessable Entity Error");
  }
}
