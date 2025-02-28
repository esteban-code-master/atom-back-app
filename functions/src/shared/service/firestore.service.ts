import { firestore } from "firebase-admin";
import { injectable } from "inversify";
import { FirestoreService } from "@shared/interface/firestore.service";
import { getFirestore } from "firebase-admin/firestore";

@injectable()
export class FirestoreServiceImpl implements FirestoreService {
  private db: firestore.Firestore;

  constructor() {
    this.db = getFirestore("arkon-db");
  }

  getCollection(name: string): firestore.CollectionReference {
    return this.db.collection(name);
  }
}
