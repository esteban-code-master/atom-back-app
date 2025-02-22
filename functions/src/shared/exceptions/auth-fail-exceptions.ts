import { StatusCodes } from "http-status-codes";
import { BaseException } from "./base-exceptions";

export class AuthenticationFailedException extends BaseException {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED, "NotFoundException");
  }
}
