import { HttpsError } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandlingMiddleware = (error: Error | HttpsError, req: Request, res: Response) => {
  if (error instanceof HttpsError) {
    logger.error(`An error occurred in the route: ${req.originalUrl}`, error);

    return res.status(Number(error.code) || StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: error.message,
      details: error.details || "No details available",
    });
  }

  logger.error(`Unexpected error in route: ${req.originalUrl}`, error);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    message: "Internal server error",
    details: error.message || "No details available",
  });
};
