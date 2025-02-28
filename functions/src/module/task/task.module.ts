import { ContainerModule } from "inversify";
import { TaskController } from "@module/task/infrastructure/controller/task.controller";
import { CreateTaskUseCase } from "@module/task/application/use-case/create-task.use-case";
import { TaskRepository } from "@module/task/domain/repository/task.repository";
import { TaskRepositoryImpl } from "@module/task/infrastructure/repository/task.repository";
import { FindTaskUseCase } from "@module/task/application/use-case/find-task.use-case";
import { DeleteTaskUseCase } from "@module/task/application/use-case/delete-task.use-case";
import { UpdateTaskUseCase } from "@module/task/application/use-case/update-task.use-case";
import { FindByIdTaskUseCase } from "@module/task/application/use-case/find-by-id-task.use-case";
import { CompleteTaskUseCase } from "./application/use-case/complete-task.use-case";

export const taskModule: ContainerModule = new ContainerModule((bind) => {
  bind(TaskController).toSelf();
  bind(CreateTaskUseCase).toSelf();
  bind(FindTaskUseCase).toSelf();
  bind(FindByIdTaskUseCase).toSelf();
  bind(DeleteTaskUseCase).toSelf();
  bind(UpdateTaskUseCase).toSelf();
  bind(CompleteTaskUseCase).toSelf();
  bind<TaskRepository>(TaskRepository).to(TaskRepositoryImpl);
});
