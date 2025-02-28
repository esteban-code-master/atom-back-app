import { Task } from "@module/task/domain/model/task.model";
import { firestore } from "firebase-admin";
import { FirestoreDataConverter, Timestamp } from "firebase-admin/firestore";

export const taskConverter: FirestoreDataConverter<Task> = {
  toFirestore(task: Task): firestore.DocumentData {
    return {
      userId: task.userId,
      title: task.title,
      description: task.description,
      createAt: task.createAt,
      status: task.status,
      duration: task.duration,
      dateRange: task.dateRange,
      deletedAt: null,
    };
  },
  fromFirestore(snapshot: firestore.QueryDocumentSnapshot): Task {
    const { userId, title, description, createAt, status, duration, dateRange, timestampRegister } = snapshot.data();

    let createAtDate = "";

    if (createAt instanceof Timestamp) {
      createAtDate = createAt.toDate().toDateString();
    }

    return new Task(
      snapshot.id,
      userId,
      title,
      description,
      createAtDate,
      duration,
      timestampRegister,
      dateRange,
      status,
    );
  },
};
