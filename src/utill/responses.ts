import { ErrorResponse } from "../errors/errorResponce";
import { SystemError } from "../errors/systemError";

const ID_EXISTS = "ID already exist.";
const USER_VALIDATION_FAILED = "User validation failed";
const VALIDATION_FAILED = "Validation failed";
const INVALID_UID = "uid is not valid";
const INSUFFICIENT_QUANTITY = "Insufficient Item Count";
const ARCHIVED_ITEM = "Cannot access archived items";
const NO_USER = "User Does Not Exist";

export const errorResponse = (error: any): ErrorResponse => {
  let errResponse: ErrorResponse;
  if (error.codePrefix === "auth") {
    errResponse = ErrorResponse.voidError(
      error.errorInfo.code,
      422,
      error.errorInfo.message
    );
  } else if (error instanceof SystemError) {
    errResponse = error.error;
  } else if (error.code === 11000) {
    errResponse = ErrorResponse.voidError(ID_EXISTS, 409, error.toString());
  } else if (error.message === USER_VALIDATION_FAILED) {
    errResponse = ErrorResponse.voidError(error.message, 422, error.toString());
  } else if (error.message === VALIDATION_FAILED) {
    errResponse = ErrorResponse.voidError(error.message, 422, error.toString());
  } else if (error.kind === "ObjectId") {
    errResponse = ErrorResponse.voidError(
      INVALID_UID,
      422,
      error.reason.toString()
    );
  } else if (error.message === INSUFFICIENT_QUANTITY) {
    errResponse = ErrorResponse.voidError(error.message, 400, error.toString());
  } else if (error.message === ARCHIVED_ITEM) {
    errResponse = ErrorResponse.voidError(error.message, 400, error.toString());
  } else if (error.message === NO_USER) {
    errResponse = ErrorResponse.voidError(error.message, 400, error.toString());
  } else {
    errResponse = ErrorResponse.voidError("Error", 422, error.toString());
  }
  return errResponse;
};
