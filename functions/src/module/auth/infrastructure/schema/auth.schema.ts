import Joi from "joi";

export const userCreateSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const userQueryParamsSchema = Joi.object({
  email: Joi.string().email().required(),
});
