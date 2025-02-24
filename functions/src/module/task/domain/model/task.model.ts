import { TaskStatus } from "@module/task/domain/types/task-status";
import { Timestamp } from "firebase-admin/firestore";

export class Task {
  constructor(
    public id: string,
    public userId: string,
    public title: string,
    public description: string,
    public createAt: Timestamp,
    public status: TaskStatus,
  ) {}
}
