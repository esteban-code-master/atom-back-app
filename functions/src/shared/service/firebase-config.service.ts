import { config } from "@shared/config";
import { injectable } from "inversify";

@injectable()
export class FirebaseConfigService {
  public getCredentials(): string {
    const decodedString = Buffer.from(config, "base64").toString("utf-8");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jsonObject = JSON.parse(decodedString);
    return jsonObject;
  }
}
