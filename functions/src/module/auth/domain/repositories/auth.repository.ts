import { DecodedIdToken, UserRecord } from "firebase-admin/auth";

export interface AuthRepository {
  register(email: string): Promise<UserRecord>;
  findByEmail(email: string): Promise<UserRecord | void>;
  getToken(uid: string): Promise<string>;
  verifyToken(token: string): Promise<DecodedIdToken>;
}

export const AuthRepository = Symbol.for("AuthRepository");
