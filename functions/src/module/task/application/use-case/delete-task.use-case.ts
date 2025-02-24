import { inject, injectable } from "inversify";
import { TaskRepository } from "@module/task/domain/repository/task.repository";
import { NotFoundException } from "@shared/exceptions/not-found-exceptions";

@injectable()
export class DeleteTaskUseCase {
  constructor(@inject(TaskRepository) private taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<void> {
    const taskFound = await this.taskRepository.findById(taskId);

    if (!taskFound) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    await this.taskRepository.delete(taskId);
  }
}
