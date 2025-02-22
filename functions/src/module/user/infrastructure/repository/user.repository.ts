import { inject, injectable } from "inversify";
import { firestore } from "firebase-admin";
import { UserRepository } from "@module/user/domain/repository/user.repository";
import { User } from "@module/user/domain/model/user.model";
import { FirestoreService } from "@shared/interface/firestore.service";
import { NotFoundException } from "@shared/exceptions/not-found-exceptions";

@injectable()
export class UserRepositoryImpl implements UserRepository {
  private collection: firestore.CollectionReference;

  constructor(@inject(FirestoreService) private readonly firestoreService: FirestoreService) {
    this.collection = this.firestoreService.getCollection("users");
  }

  async create(user: User): Promise<User> {
    const docRef = this.collection.doc();
    user.id = docRef.id;
    await docRef.set(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.collection.where("email", "==", email).get();

    if (result.empty) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    const doc = result.docs[0];
    return doc.exists ? (doc.data() as User) : ({} as User);
  }
}
