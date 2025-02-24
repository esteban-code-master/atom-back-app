import { Task } from "@module/task/domain/model/task.model";
import { TaskRepository } from "@module/task/domain/repository/task.repository";
import { Timestamp } from "firebase-admin/firestore";
import { inject, injectable } from "inversify";

@injectable()
export class CreateTaskUseCase {
  constructor(@inject(TaskRepository) private taskRepository: TaskRepository) {}

  async execute(task: Task): Promise<Task> {
    return await this.taskRepository.create({
      ...task,
      status: "pending",
      createAt: Timestamp.now(),
    });
  }
}
