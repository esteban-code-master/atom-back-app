import { inject, injectable } from "inversify";
import { firestore } from "firebase-admin";
import { Task } from "@module/task/domain/model/task.model";
import { FirestoreService } from "@shared/interface/firestore.service";
import { TaskRepository } from "@module/task/domain/repository/task.repository";
import { taskConverter } from "@module/task/infrastructure/mappers/firestore-data-converter";
import { WriteResult } from "firebase-admin/firestore";
import { FilterTaskDto } from "@module/task/application/dto/filter-task.dto";
import { PAGINATION_DEFAULT } from "@module/user/infrastructure/const/constants";

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

  async find(filter: FilterTaskDto): Promise<[Task[], string | null]> {
    const { userId, pageSize = PAGINATION_DEFAULT, lastVisibleId, search } = filter;

    let query = this.collection
      .withConverter(taskConverter)
      .where("userId", "==", userId)
      .orderBy("createAt")
      .limit(pageSize);

    if (search) {
      query = query.where("title", ">=", search).where("title", "<=", search + "\uf8ff");
    }

    if (lastVisibleId) {
      const lastVisibleDoc = await this.collection.doc(lastVisibleId).get();

      if (!lastVisibleDoc.exists) {
        return [[], null];
      }

      query = query.startAfter(lastVisibleDoc);
    }

    const snapshot = await query.get();
    const tasks = snapshot.docs.map((doc) => ({
      ...doc.data(),
      createAt: doc.data().createAt.toString(),
    }));

    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    return [tasks, lastVisible?.id];
  }

  async findById(id: string): Promise<Task | null> {
    const docRef = this.collection.withConverter(taskConverter).doc(id);
    const doc = await docRef.get();

    return doc.data() ?? null;
  }

  async count(filter: FilterTaskDto): Promise<number> {
    const { userId, search } = filter;

    let query = this.collection.withConverter(taskConverter).where("userId", "==", userId).orderBy("createAt");

    if (search) {
      query = query.where("title", ">=", search).where("title", "<=", search + "\uf8ff");
    }

    const data = await query.count().get();

    return data.data().count;
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
