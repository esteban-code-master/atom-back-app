import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Joi, { ValidationErrorItem } from "joi";

export const validateRequestQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void | Response => {
    const { error } = schema.validate(req.query);
    if (error) {
      const errors: string[] = error.details.map((detail: ValidationErrorItem) => detail.message);

      return res.status(StatusCodes.BAD_REQUEST).json(errors);
    }

    next();
  };
};
