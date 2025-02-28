import { FilterTaskDto } from "@module/task/application/dto/filter-task.dto";
import { Task } from "@module/task/domain/model/task.model";
import { WriteResult } from "firebase-admin/firestore";

export interface TaskRepository {
  find(filter: FilterTaskDto): Promise<[Task[], string | null]>;
  count(filter: FilterTaskDto): Promise<number>;
  findById(id: string): Promise<Task | null>;
  create(task: Task): Promise<Task>;
  update(id: string, task: Partial<Task>): Promise<WriteResult>;
  delete(id: string): Promise<WriteResult>;
}

export const TaskRepository = Symbol.for("TaskRepository");
