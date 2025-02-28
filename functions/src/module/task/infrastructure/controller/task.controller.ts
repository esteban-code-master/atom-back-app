import { inject } from "inversify";
import { CreateTaskUseCase } from "@module/task/application/use-case/create-task.use-case";
import { DeleteTaskUseCase } from "@module/task/application/use-case/delete-task.use-case";
import { FindByIdTaskUseCase } from "@module/task/application/use-case/find-by-id-task.use-case";
import { FindTaskUseCase } from "@module/task/application/use-case/find-task.use-case";
import { UpdateTaskUseCase } from "@module/task/application/use-case/update-task.use-case";
import { validateRequestBody } from "@shared/middleware/validate.schema";
import { taskCreateBodySchema, taskParamsSchema, taskQuerySchema, taskUpdateBodySchema } from "../schema/task.schema";
import { validateRequestParams } from "@shared/middleware/validate-params.schema";
import { NextFunction, Response, Request } from "express";
import { Task } from "@module/task/domain/model/task.model";
import { StatusCodes } from "http-status-codes";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  next,
  queryParam,
  request,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils";
import { FirebaseAuthGuard } from "@module/auth/infrastructure/guard/auth.guard";
import { FilterTaskDto } from "@module/task/application/dto/filter-task.dto";
import { CompleteTaskUseCase } from "@module/task/application/use-case/complete-task.use-case";

@controller("/tasks", FirebaseAuthGuard.prototype.checkToken)
export class TaskController {
  constructor(
    @inject(CreateTaskUseCase) private createTaskUseCase: CreateTaskUseCase,
    @inject(FindTaskUseCase) private findTaskUseCase: FindTaskUseCase,
    @inject(DeleteTaskUseCase) private deleteTaskUseCase: DeleteTaskUseCase,
    @inject(UpdateTaskUseCase) private updateTaskUseCase: UpdateTaskUseCase,
    @inject(CompleteTaskUseCase) private completeTaskUseCase: CompleteTaskUseCase,
    @inject(FindByIdTaskUseCase)
    private findByIdTaskUseCase: FindByIdTaskUseCase,
  ) {}

  @httpPost("/", validateRequestBody(taskCreateBodySchema))
  public async post(@requestBody() body: Task, @response() res: Response, @next() next: NextFunction): Promise<void> {
    try {
      const task = await this.createTaskUseCase.execute(body);

      res.status(StatusCodes.CREATED).json(task);
    } catch (error) {
      next(error);
    }
  }

  @httpGet("/", validateRequestParams(taskQuerySchema))
  public async get(
    @queryParam() filter: FilterTaskDto,
    @response() res: Response,
    @request() req: Request,
    @next() next: NextFunction,
  ): Promise<void> {
    try {
      const task = await this.findTaskUseCase.execute({
        userId: req.user?.uid ?? "",
        search: filter?.search,
        lastVisibleId: filter?.lastVisibleId,
        pageSize: Number(filter?.pageSize),
      });

      res.status(StatusCodes.OK).json(task);
    } catch (error) {
      next(error);
    }
  }

  @httpGet("/:id", validateRequestParams(taskParamsSchema))
  public async getById(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction,
  ): Promise<void> {
    try {
      const task = await this.findByIdTaskUseCase.execute(id);

      res.status(StatusCodes.OK).json(task);
    } catch (error) {
      next(error);
    }
  }

  @httpDelete("/:id", validateRequestParams(taskParamsSchema))
  public async delete(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction,
  ): Promise<void> {
    try {
      await this.deleteTaskUseCase.execute(id);

      res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
      next(error);
    }
  }

  @httpPut("/:id", validateRequestParams(taskParamsSchema), validateRequestBody(taskUpdateBodySchema))
  public async put(
    @requestParam("id") id: string,
    @requestBody() body: Task,
    @response() res: Response,
    @next() next: NextFunction,
  ): Promise<void> {
    try {
      const task = await this.updateTaskUseCase.execute(id, body);
      res.status(StatusCodes.OK).json(task);
    } catch (error) {
      next(error);
    }
  }

  @httpPut("/complete/:id")
  public async patch(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction,
  ): Promise<void> {
    try {
      const task = await this.completeTaskUseCase.execute(id);
      res.status(StatusCodes.OK).json(task);
    } catch (error) {
      next(error);
    }
  }
}
