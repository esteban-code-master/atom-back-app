import { controller, httpGet, response } from "inversify-express-utils";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

@controller("/user")
export class UserController {
  constructor() {}

  @httpGet("/")
  public async get(@response() res: Response) {
    res.status(StatusCodes.OK).json({ hola: "hello !!" });
  }
}
