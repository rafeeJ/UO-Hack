import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Challenge, challengeConverter } from 'src/app/services/fire-layer/challenge';
import { User } from './user';
import { AuthService } from '../auth-service/auth.service';
import { Submission } from './submission';

@Injectable({
  providedIn: 'root'
})
export class FireLayerService {
  challengeCollection: AngularFirestoreCollection<Challenge>;
  userCollection: AngularFirestoreCollection<User>;
  submissionCollection: AngularFirestoreCollection<Submission>;

  constructor(private firestore: AngularFirestore, private auth: AuthService) { 
    this.challengeCollection = firestore.collection<Challenge>("challenges");
    this.userCollection = firestore.collection<User>("users");
    this.submissionCollection = firestore.collection<Submission>('submissions');
  }


  // CHALLENGES

  getChallenge(uid: string){
    return this.firestore.doc<Challenge>("challenges/" + uid).get();
  }

  updateChallenge(challenge: Challenge){
    return this.firestore.doc<Challenge>('challenges/' + challenge.uid).set(challenge);
  }

  deleteChallenge(uid: string){
    return this.firestore.doc<Challenge>('challenges/' + uid).delete();
  }
    
  createChallenge(challenge: Challenge) { 
    return new Promise<any>((resolve, reject)=> {
      this.challengeCollection
      .add(challenge)
      .then(res => {}, err => reject(err));
    })
  }

  getActiveChallenge() {
    var user: User;
    
    this.auth.user$.subscribe(user_input => {
      if(user_input != null) {
        user = user_input;
        return user.activeChallenge
            .withConverter<Challenge>(challengeConverter)
            .get()
      }
      else {
        return null;
      }
    })
  }

  // USERS

  getUser(uid: string) {
    return this.firestore.doc<User>("users/" + uid).get();
  }

  getAllUsers() {
    return this.userCollection.snapshotChanges();
  }

  // SUBMISSIONS

  getSubmission(uid: string) {
    return this.firestore.doc<Submission>('submissions/' + uid).get();
  }

  createSubmission(submission: Submission){
  return new Promise<any>((resolve, reject)=> {
    this.submissionCollection
    .add(submission)
    .then(res => {}, err => reject(err));
  })}

  updateSubmission(submission: Submission){
    return this.firestore.doc<Submission>('submissions/'+submission.uid).update(submission);
  }

  deleteSubmission(uid: string){
    return this.firestore.doc<Submission>('submissions/'+uid).delete();
  }
}
