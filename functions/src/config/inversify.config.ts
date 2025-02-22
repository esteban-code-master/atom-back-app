import { authModule } from "@module/auth/auth.module";
import { taskModule } from "@module/task/task.module";
import { userModule } from "@module/user/user.module";
import { FirestoreService } from "@shared/interface/firestore.service";
import { FirebaseAdminService } from "@shared/service/firebase-admin.service";
import { FirebaseConfigService } from "@shared/service/firebase-config.service";
import { FirestoreServiceImpl } from "@shared/service/firestore.service";
import { Container } from "inversify";

const container = new Container();
container.bind(FirebaseConfigService).toSelf();
container.bind(FirebaseAdminService).toSelf().inSingletonScope();
container.bind<FirestoreService>(FirestoreService).to(FirestoreServiceImpl).inSingletonScope();

container.load(authModule);
container.load(userModule);
container.load(taskModule);

export { container };
