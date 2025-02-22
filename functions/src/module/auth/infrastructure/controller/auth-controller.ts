import { inject } from "inversify";
import { NextFunction, Response } from "express";
import { controller, httpPost, response, next, requestBody } from "inversify-express-utils";
import { Auth } from "@module/auth/infrastructure/request/auth";
import { StatusCodes } from "http-status-codes";
import { LoginAuthUseCase } from "@module/auth/application/use-case/login.use-case";

@controller("/auth")
export class AuthController {
  constructor(@inject(LoginAuthUseCase) private readonly loginAuth: LoginAuthUseCase) {}

  @httpPost("/login")
  public async login(@requestBody() body: Auth, @response() res: Response, @next() next: NextFunction): Promise<void> {
    try {
      const user = await this.loginAuth.execute(body.email);

      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  }
}
