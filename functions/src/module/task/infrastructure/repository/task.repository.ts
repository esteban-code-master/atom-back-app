import { inject, injectable } from "inversify";
import { firestore } from "firebase-admin";
import { Task } from "@module/task/domain/model/task.model";
import { FirestoreService } from "@shared/interface/firestore.service";
import { TaskRepository } from "@module/task/domain/repository/task.repository";
import { taskConverter } from "@module/task/infrastructure/mappers/firestore-data-converter";
import { WriteResult } from "firebase-admin/firestore";

@injectable()
export class TaskRepositoryImpl implements TaskRepository {
  private collection: firestore.CollectionReference;

  constructor(@inject(FirestoreService) private firestoreService: FirestoreService) {
    this.collection = this.firestoreService.getCollection("tasks");
  }

  async create(task: Task): Promise<Task> {
    const docRef = this.collection.withConverter(taskConverter).doc();
    task.id = docRef.id;
    await docRef.set(task);

    return task;
  }

  async find(): Promise<Task[]> {
    const result = await this.collection.withConverter(taskConverter).get();
    if (result.empty) return [];

    return result.docs.map((doc) => doc.data());
  }

  async findById(id: string): Promise<Task | null> {
    const docRef = this.collection.withConverter(taskConverter).doc(id);
    const doc = await docRef.get();

    return doc.data() ?? null;
  }

  async update(taskId: string, task: Task): Promise<WriteResult> {
    const taskUpdate = await this.collection
      .withConverter(taskConverter)
      .doc(taskId)
      .update({ ...task });

    return taskUpdate;
  }

  async delete(id: string): Promise<WriteResult> {
    return this.collection.doc(id).delete();
  }
}
