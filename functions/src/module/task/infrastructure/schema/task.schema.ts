import { FilterTaskDto } from "@module/task/application/dto/filter-task.dto";
import { Task } from "@module/task/domain/model/task.model";
import Joi from "joi";

export const taskCreateBodySchema = Joi.object<Task>({
  userId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  duration: Joi.number().required(),
  dateRange: Joi.object({
    start: Joi.date().required(),
    end: Joi.date().required(),
  }).required(),
});

export const taskUpdateBodySchema = Joi.object<Task>({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid("pending", "completed").optional(),
});

export const taskParamsSchema = Joi.object<Task>({
  id: Joi.string().required(),
});

export const taskQuerySchema = Joi.object<FilterTaskDto>({
  search: Joi.string(),
  lastVisibleId: Joi.string(),
  pageSize: Joi.number(),
});
