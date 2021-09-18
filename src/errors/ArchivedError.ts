import BaseError from "./baseError";

export default class ArchivedError extends BaseError {
  constructor() {
    super(404, "Cannot access archived items");
  }
}