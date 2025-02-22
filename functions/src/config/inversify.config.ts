import { authModule } from "@module/auth/auth.module";
import { FirestoreService } from "@shared/interface/firestore.service";
import { FirebaseAdminService } from "@shared/service/firebase-admin.service";
import { FirestoreServiceImpl } from "@shared/service/firestore.service";
import { Container } from "inversify";

const container = new Container();
container.bind<FirebaseAdminService>(FirebaseAdminService).toSelf().inSingletonScope();
container.bind<FirestoreService>(FirestoreService).to(FirestoreServiceImpl).inSingletonScope();

container.load(authModule);

export { container };
