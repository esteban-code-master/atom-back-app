import { ContainerModule } from "inversify";
import { UserController } from "./infrastructure/controller/user-controller";

export const TYPES = {
  UserController: Symbol.for("UserController"),
};

export const userModule: ContainerModule = new ContainerModule((bind) => {
  bind<UserController>(TYPES.UserController).to(UserController);
});
