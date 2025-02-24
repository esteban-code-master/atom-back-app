import * as fs from "fs";
import { injectable } from "inversify";

@injectable()
export class FirebaseConfigService {
  public getCredentials(): string {
    const credentialsPath = "../credential.json";

    if (!fs.existsSync(credentialsPath)) {
      throw new Error(`Credentials file does not exist at path: ${credentialsPath}`);
    }

    const fileContent = fs.readFileSync(credentialsPath, "utf-8");
    return JSON.parse(fileContent);
  }
}
