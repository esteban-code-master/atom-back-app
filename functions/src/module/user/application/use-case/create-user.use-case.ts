import { Auth } from "@module/auth/domain/model/auth";
import { AuthRepository } from "@module/auth/domain/repositories/auth.repository";
import { RecordExistsExceptions } from "@shared/exceptions/record-exists-exceptions";
import { inject, injectable } from "inversify";

@injectable()
export class CreateUserUseCase {
  constructor(@inject(AuthRepository) private readonly authRepository: AuthRepository) {}

  public async execute(email: string): Promise<Auth | void> {
    const userFound = await this.authRepository.findByEmail(email);

    if (userFound) {
      throw new RecordExistsExceptions(`user exist with email: ${userFound.email}`);
    }

    const user = await this.authRepository.register(email);
    const token = await this.authRepository.getToken(user.uid);

    return {
      uid: user.uid,
      email,
      token,
    };
  }
}
