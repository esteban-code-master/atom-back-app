import { inject, injectable } from "inversify";
import { Task } from "@module/task/domain/model/task.model";
import { TaskRepository } from "@module/task/domain/repository/task.repository";
import { NotFoundException } from "@shared/exceptions/not-found-exceptions";

@injectable()
export class UpdateTaskUseCase {
  constructor(@inject(TaskRepository) private taskRepository: TaskRepository) {}

  async execute(taskId: string, task: Task): Promise<Task> {
    const taskFound = await this.taskRepository.findById(taskId);

    if (!taskFound) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    await this.taskRepository.update(taskId, task);

    return taskFound;
  }
}
