import Joi from "joi";

export const taskCreateBodySchema = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const taskUpdateBodySchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid("pending", "completed").optional(),
});

export const taskParamsSchema = Joi.object({
  id: Joi.string().required(),
});
