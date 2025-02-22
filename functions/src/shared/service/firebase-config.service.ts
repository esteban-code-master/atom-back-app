import * as fs from "fs";
import { injectable } from "inversify";

@injectable()
export class FirebaseConfigService {
  public getCredentials(): string {
    const credentialsPath = process.env.FIREBASE_CREDENTIALS_JSON || "";

    if (!fs.existsSync(credentialsPath)) {
      throw new Error(`Credentials file does not exist at path: ${credentialsPath}`);
    }

    return credentialsPath;
  }
}
