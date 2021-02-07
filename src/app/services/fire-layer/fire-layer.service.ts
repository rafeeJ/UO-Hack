import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import {
  Challenge,
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
    challenge.location = Object.assign({}, challenge.location);
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
    challenge.location = Object.assign({}, challenge.location);
    return new Promise<any>((resolve, reject) => {
      this.challengeCollection.doc(challenge.uid).set(Object.assign({}, challenge)).then(
        (res) => {},
        (err) => reject(err)
      );
    });
  }

  getCreatedChallenges(uid: string) {
    return this.firestore
      .collection<Challenge>('challenges', (ref) =>
        ref.where('creatorUID', '==', uid)
      )
      .get();
  }

  // USERS

  getUser(uid: string) {
    return this.firestore.doc<User>('users/' + uid).get();
  }

  getAllUsers() {
    return this.userCollection.snapshotChanges();
  }

  updateUser(user: User) {
    return this.firestore.doc<User>('users/' + user.uid).update(user);
  }

  // SUBMISSIONS

  getSubmission(uid: string) {
    return this.firestore.doc<Submission>('submissions/' + uid).get();
  }
  
  createSubmission(submission: Submission) {
    return new Promise<any>((resolve, reject) => {
      this.submissionCollection.doc(submission.uid).set(Object.assign({}, submission)).then(
        (res) => {
          resolve(submission.uid);
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
