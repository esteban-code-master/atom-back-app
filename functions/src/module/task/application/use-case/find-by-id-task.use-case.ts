import { inject, injectable } from "inversify";
import { Task } from "@module/task/domain/model/task.model";
import { TaskRepository } from "@module/task/domain/repository/task.repository";
import { NotFoundException } from "@shared/exceptions/not-found-exceptions";

@injectable()
export class FindByIdTaskUseCase {
  constructor(@inject(TaskRepository) private taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<Task> {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return task;
  }
}
