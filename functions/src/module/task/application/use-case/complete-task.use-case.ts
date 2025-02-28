import { inject, injectable } from "inversify";
import { Task } from "@module/task/domain/model/task.model";
import { TaskRepository } from "@module/task/domain/repository/task.repository";
import { NotFoundException } from "@shared/exceptions/not-found-exceptions";
import { TaskStatus } from "../enum/task.enum";
import { ConflictRecordExceptions } from "@shared/exceptions/conflict-record";
import { getMinutesBetweenDates } from "@shared/utils/get-minutes-dates";

@injectable()
export class CompleteTaskUseCase {
  constructor(@inject(TaskRepository) private taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<Task> {
    const taskFound = await this.taskRepository.findById(taskId);

    if (!taskFound) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    if (taskFound.status === TaskStatus.COMPLETED) {
      throw new ConflictRecordExceptions("Task already completed");
    }

    const timestampRegister = getMinutesBetweenDates(new Date(taskFound.dateRange.end), new Date());

    await this.taskRepository.update(taskId, {
      status: TaskStatus.COMPLETED,
      timestampRegister,
    });

    return taskFound;
  }
}
