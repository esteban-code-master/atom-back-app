import { inject, injectable } from "inversify";
import { Task } from "@module/task/domain/model/task.model";
import { TaskRepository } from "@module/task/domain/repository/task.repository";
import { NotFoundException } from "@shared/exceptions/not-found-exceptions";
import { TaskStatus } from "../enum/task.enum";
import { ConflictRecordExceptions } from "@shared/exceptions/conflict-record";

@injectable()
export class UpdateTaskUseCase {
  constructor(@inject(TaskRepository) private taskRepository: TaskRepository) {}

  async execute(taskId: string, task: Task): Promise<Task> {
    const taskFound = await this.taskRepository.findById(taskId);

    if (!taskFound) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    if (taskFound.status === TaskStatus.COMPLETED) {
      throw new ConflictRecordExceptions("Task already completed");
    }

    await this.taskRepository.update(taskId, task);

    return taskFound;
  }
}
