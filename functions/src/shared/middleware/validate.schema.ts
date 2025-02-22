import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Joi, { ValidationErrorItem } from "joi";

export function validateRequestBody(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): void | Response => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail: ValidationErrorItem) => ({
        message: detail.message,
        path: detail.path,
        type: detail.type,
      }));

      return res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }

    next();
  };
}
