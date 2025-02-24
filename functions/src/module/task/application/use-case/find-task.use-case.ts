import { inject, injectable } from "inversify";
import { Task } from "@module/task/domain/model/task.model";
import { TaskRepository } from "@module/task/domain/repository/task.repository";
import { FilterTaskDto } from "../dto/filter-task.dto";
import { Pagination } from "@module/task/infrastructure/response/pagination";

@injectable()
export class FindTaskUseCase {
  constructor(@inject(TaskRepository) private taskRepository: TaskRepository) {}

  async execute(filter: FilterTaskDto): Promise<Pagination<Task>> {
    const cleanFilter: FilterTaskDto = Object.fromEntries(
      Object.entries(filter).filter(([_, value]) => value != null && value !== undefined),
    );

    const [task, lastVisibleDoc] = await this.taskRepository.find(cleanFilter);
    const totalDocument = await this.taskRepository.count(cleanFilter);

    return {
      data: task,
      lastVisibleId: lastVisibleDoc,
      totalPage: totalDocument,
    };
  }
}
