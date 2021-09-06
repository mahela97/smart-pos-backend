import BaseError from "./baseError";

export default class InsufficientItemError extends BaseError {
  constructor() {
    super(400, "Insufficient Item Count");
  }
}
