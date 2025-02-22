import * as admin from "firebase-admin";
import { injectable } from "inversify";

@injectable()
export class FirebaseAdminService {
  private static instance: admin.app.App | null = null;

  public app: admin.app.App;

  constructor() {
    if (!FirebaseAdminService.instance) {
      admin.initializeApp();

      FirebaseAdminService.instance = admin.app();
    }

    this.app = FirebaseAdminService.instance;
  }
}
