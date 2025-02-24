import { container } from "@config/inversify.config";
import { AuthRepository } from "@module/auth/domain/repositories/auth.repository";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { injectable } from "inversify";

@injectable()
export class FirebaseAuthGuard {
  public async checkToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No token provided" });
    }

    try {
      const authRepository = container.get<AuthRepository>(AuthRepository);

      const decodedToken = await authRepository.verifyToken(token);
      req.user = decodedToken;

      next();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Invalid or expired token hola",
          details: error.message,
        });
      }

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An unexpected error occurred",
      });
    }
  }
}
