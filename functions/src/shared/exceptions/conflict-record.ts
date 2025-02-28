import { StatusCodes } from "http-status-codes";

export class ConflictRecordExceptions extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = "ConflictRecordExceptions";
    this.status = StatusCodes.CONFLICT;
  }
}
