import { Task } from "@module/task/domain/model/task.model";
import { firestore } from "firebase-admin";
import { FirestoreDataConverter } from "firebase-admin/firestore";

export const taskConverter: FirestoreDataConverter<Task> = {
  toFirestore(task: Task): firestore.DocumentData {
    return {
      userId: task.userId,
      title: task.title,
      description: task.description,
      createAt: task.createAt,
      status: task.status,
    };
  },
  fromFirestore(snapshot: firestore.QueryDocumentSnapshot): Task {
    const { userId, title, description, createAt, status, duration, dateRange, timestampRegister } = snapshot.data();

    let createAtDate = "";

    if (createAt instanceof firestore.Timestamp) {
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
