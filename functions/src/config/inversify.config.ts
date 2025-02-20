import { userModule } from "@module/user/user.container";
import { Container } from "inversify";

const container = new Container();
container.load(userModule);

export { container };
