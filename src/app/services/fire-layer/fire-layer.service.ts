import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData,
  DocumentReference,
} from '@angular/fire/firestore';
import {
  Challenge,
  challengeConverter,
} from 'src/app/services/fire-layer/challenge';
import { User } from './user';
import { AuthService } from '../auth-service/auth.service';
import { Submission } from './submission';

@Injectable({
  providedIn: 'root',
})
export class FireLayerService {
  challengeCollection: AngularFirestoreCollection<Challenge>;
  userCollection: AngularFirestoreCollection<User>;
  submissionCollection: AngularFirestoreCollection<Submission>;

  constructor(private firestore: AngularFirestore, private auth: AuthService) {
    this.challengeCollection = firestore.collection<Challenge>('challenges');
    this.userCollection = firestore.collection<User>('users');
    this.submissionCollection = firestore.collection<Submission>('submissions');
  }

  // CHALLENGES

  getChallenge(uid: string) {
    return this.firestore.doc<Challenge>('challenges/' + uid).get();
  }

  updateChallenge(challenge: Challenge) {
    return this.firestore
      .doc<Challenge>('challenges/' + challenge.uid)
      .set(Object.assign({}, challenge));
  }

  deleteChallenge(uid: string) {
    return this.firestore.doc<Challenge>('challenges/' + uid).delete();
  }

  getAllChallenges() {
    return this.challengeCollection.snapshotChanges();
  }

  createChallenge(challenge: Challenge) {
    return new Promise<any>((resolve, reject) => {
      this.challengeCollection.add(Object.assign({}, challenge)).then(
        (res) => {},
        (err) => reject(err)
      );
    });
  }

  getCreatedChallenges(uid: string) {
    return this.firestore
      .collection('challenges', (ref) => ref.where('creatorUID', '==', uid))
      .get();
  }

  // USERS

  getUser(uid: string) {
    return this.firestore.doc<User>('users/' + uid).get();
  }

  getAllUsers() {
    return this.userCollection.snapshotChanges();
  }

  // SUBMISSIONS

  getSubmission(uid: string) {
    return this.firestore.doc<Submission>('submissions/' + uid).get();
  }

  createSubmission(submission: Submission) {
    return new Promise<any>((resolve, reject) => {
      this.submissionCollection.add(Object.assign({}, submission)).then(
        (res) => {
          resolve(res.id);
        },
        (err) => reject(err)
      );
    });
  }

  updateSubmission(submission: Submission) {
    return this.firestore
      .doc<Submission>('submissions/' + submission.uid)
      .update(submission);
  }

  deleteSubmission(uid: string) {
    return this.firestore.doc<Submission>('submissions/' + uid).delete();
  }

  getSubmissionReference(uid: string) {
    return this.firestore.doc<Submission>('submissions' + uid);
  }
}
