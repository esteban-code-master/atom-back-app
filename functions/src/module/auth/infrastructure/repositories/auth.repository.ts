import { DecodedIdToken, UserRecord } from "firebase-admin/auth";
import { inject, injectable } from "inversify";
import { AuthRepository } from "@module/auth/domain/repositories/auth.repository";
import { FirebaseAdminService } from "@shared/service/firebase-admin.service";

@injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(@inject(FirebaseAdminService) private readonly firebaseAdmin: FirebaseAdminService) {}

  public async register(email: string): Promise<UserRecord> {
    const user = await this.firebaseAdmin.app.auth().createUser({
      email: email,
    });

    return user;
  }

  public async findByEmail(email: string): Promise<UserRecord | void> {
    try {
      const user = await this.firebaseAdmin.app.auth().getUser(email);
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        //
      }
      return undefined;
    }
  }

  public async getToken(uid: string): Promise<string> {
    const token = await this.firebaseAdmin.app.auth().createCustomToken(uid);
    return token;
  }

  public async verifyToken(token: string): Promise<DecodedIdToken> {
    return this.firebaseAdmin.app.auth().verifyIdToken(token);
  }
}
