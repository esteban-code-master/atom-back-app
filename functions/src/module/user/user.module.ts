import { ContainerModule } from "inversify";
import { CreateUserUseCase } from "@module/user/application/use-case/create-user.use-case";
import { FindByEmailUserUseCase } from "@module/user/application/use-case/fin-by-email.use-case";
import { UserRepositoryImpl } from "@module/user/infrastructure/repository/user.repository";
import { UserRepository } from "@module/user/domain/repository/user.repository";
import { UserController } from "@module/user/infrastructure/controller/user-controller";

export const userModule: ContainerModule = new ContainerModule((bind) => {
  bind(UserController).toSelf();
  bind(CreateUserUseCase).toSelf();
  bind(FindByEmailUserUseCase).toSelf();
  bind<UserRepository>(UserRepository).to(UserRepositoryImpl);
});
