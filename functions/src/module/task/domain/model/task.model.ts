import { TaskStatus } from "@module/task/domain/types/task-status";

export class Task {
  constructor(
    public id: string,
    public userId: string,
    public title: string,
    public description: string,
    public createAt: Date | string,
    public duration: number,
    public timestampRegister: number,
    public dateRange: DateRange,
    public status: TaskStatus,
  ) {}
}

export class DateRange {
  constructor(
    public start: Date | string,
    public end: Date | string,
  ) {}
}
