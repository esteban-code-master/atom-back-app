import { StatusCodes } from "http-status-codes";
// import { BaseException } from "./base-exceptions";

export class RecordExistsExceptions extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = "RecordExistsExceptions";
    this.status = StatusCodes.CONFLICT;
  }
}
