import { ContainerModule } from "inversify";
import { AuthRepository } from "@module/auth/domain/repositories/auth.repository";
import { AuthRepositoryImpl } from "@module/auth/infrastructure/repositories/auth.repository";
import { LoginAuthUseCase } from "@module/auth/application/use-case/login.use-case";
import { AuthController } from "@module/auth/infrastructure/controller/auth-controller";

export const authModule: ContainerModule = new ContainerModule((bind) => {
  bind(AuthController).toSelf();
  bind(LoginAuthUseCase).toSelf();
  bind<AuthRepository>(AuthRepository).to(AuthRepositoryImpl);
});
