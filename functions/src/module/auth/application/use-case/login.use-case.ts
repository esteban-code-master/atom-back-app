import { Auth } from "@module/auth/domain/model/auth";
import { AuthRepository } from "@module/auth/domain/repositories/auth.repository";
import { AuthenticationFailedException } from "@shared/exceptions/auth-fail-exceptions";
import { NotFoundException } from "@shared/exceptions/not-found-exceptions";
import { inject, injectable } from "inversify";

@injectable()
export class LoginAuthUseCase {
  constructor(@inject(AuthRepository) private authRepository: AuthRepository) {}

  public async execute(email: string): Promise<Auth> {
    try {
      const user = await this.authRepository.findByEmail(email);

      if (!user) {
        throw new NotFoundException(`User Not Found ${email}`);
      }

      const token = await this.authRepository.getToken(user.uid);

      return {
        uid: user.uid,
        email,
        token,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new AuthenticationFailedException(`Authentication failed: ${error.message}`);
      }

      throw new AuthenticationFailedException("Authentication failed due to an unknown error.");
    }
  }
}
