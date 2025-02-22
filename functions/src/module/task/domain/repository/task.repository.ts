import { Task } from "@module/task/domain/model/task.model";
import { WriteResult } from "firebase-admin/firestore";

export interface TaskRepository {
  find(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  create(task: Task): Promise<Task>;
  update(id: string, task: Task): Promise<WriteResult>;
  delete(id: string): Promise<WriteResult>;
}

export const TaskRepository = Symbol.for("TaskRepository");
