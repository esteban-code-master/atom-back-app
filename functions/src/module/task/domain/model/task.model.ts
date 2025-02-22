import { TaskStatus } from "@module/task/domain/types/task-status";

export class Task {
  constructor(
    public id: string,
    public userId: string,
    public title: string,
    public description: string,
    public createAt: Date,
    public status: TaskStatus,
  ) {}
}
