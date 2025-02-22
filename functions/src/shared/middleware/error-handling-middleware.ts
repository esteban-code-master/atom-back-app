import * as logger from "firebase-functions/logger";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { BaseException } from "@shared/exceptions/base-exceptions";

export const errorHandlingMiddleware = (
  error: Error | BaseException,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof BaseException) {
    logger.error(`An error occurred in the route: ${req.originalUrl}`, error);

    return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }

  logger.error(`Unexpected error in route: ${req.originalUrl}`, error);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
    details: error.message || "No details available",
  });
};
