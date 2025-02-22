import { StatusCodes } from "http-status-codes";
import { BaseException } from "./base-exceptions";

export class NotFoundException extends BaseException {
  constructor(message = "Not Found") {
    super(message, StatusCodes.NOT_FOUND, "NotFoundException");
  }
}
