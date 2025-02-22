import { controller, httpGet, httpPost, next, queryParam, requestBody, response } from "inversify-express-utils";
import { NextFunction, Response } from "express";
import { CreateUserUseCase } from "@module/user/application/use-case/create-user.use-case";
import { FindByEmailUserUseCase } from "@module/user/application/use-case/fin-by-email.use-case";
import { validateRequestBody } from "@shared/middleware/validate.schema";
import { userCreateSchema, userQueryParamsSchema } from "@module/user/infrastructure/schema/user.schema";
import { StatusCodes } from "http-status-codes";
import { validateRequestQuery } from "@shared/middleware/validate-query.schema";
import { User } from "@module/user/domain/model/user.model";

@controller("/users")
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findByEmailUserUseCase: FindByEmailUserUseCase,
  ) {}

  @httpPost("/", validateRequestBody(userCreateSchema))
  public async post(@requestBody() body: User, @response() res: Response, @next() next: NextFunction): Promise<void> {
    try {
      const user = await this.createUserUseCase.execute(body.email);

      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  }

  @httpGet("/", validateRequestQuery(userQueryParamsSchema))
  public async getById(
    @response() res: Response,
    @queryParam("email") email: string,
    @next() next: NextFunction,
  ): Promise<void> {
    try {
      const user = await this.findByEmailUserUseCase.execute(email);

      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  }
}
