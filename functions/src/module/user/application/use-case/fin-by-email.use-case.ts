import { inject, injectable } from "inversify";
import { UserRecord } from "firebase-admin/auth";
import { AuthRepository } from "@module/auth/domain/repositories/auth.repository";

@injectable()
export class FindByEmailUserUseCase {
  constructor(@inject(AuthRepository) private authRepository: AuthRepository) {}

  async execute(email: string): Promise<UserRecord | void> {
    return await this.authRepository.findByEmail(email);
  }
}
