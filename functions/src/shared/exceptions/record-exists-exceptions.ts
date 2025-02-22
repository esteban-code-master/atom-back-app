import { StatusCodes } from "http-status-codes";
import { BaseException } from "./base-exceptions";

export class RecordExistsExceptions extends BaseException {
  constructor(message = "Record Exists") {
    super(message, StatusCodes.CONFLICT, "RecordExistsException");
  }
}
