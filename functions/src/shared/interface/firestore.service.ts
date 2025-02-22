import { firestore } from "firebase-admin";

export interface FirestoreService {
  getCollection(name: string): firestore.CollectionReference;
}

export const FirestoreService = Symbol.for("FirestoreService");
