import * as admin from "firebase-admin";
import { inject, injectable } from "inversify";
import { FirebaseConfigService } from "./firebase-config.service";

@injectable()
export class FirebaseAdminService {
  private static instance: admin.app.App | null = null;

  public app: admin.app.App;

  constructor(@inject(FirebaseConfigService) private readonly firebaseConfigService: FirebaseConfigService) {
    if (!FirebaseAdminService.instance) {
      admin.initializeApp({
        credential: admin.credential.cert(this.firebaseConfigService.getCredentials()),
      });

      FirebaseAdminService.instance = admin.app();
    }

    this.app = FirebaseAdminService.instance;
  }
}
