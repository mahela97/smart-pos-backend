import BaseError from "./baseError";

export default class UserDoesNotExistError extends BaseError {
  constructor() {
    super(400, "User Does Not Exist");
  }
}
