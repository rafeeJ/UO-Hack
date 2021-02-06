<<<<<<< HEAD
import { DocumentData, DocumentReference } from '@angular/fire/firestore';

export class Challenge {
  constructor(
    public uid: string,
    public creatorUID: string,
    public location: [number, number],
    public photoURL: string,
    public submissions: Array<string>
  ) {}
=======
import { DocumentData, DocumentReference } from "@angular/fire/firestore";
import { Coordinates } from "./coordinates";

export class Challenge {
    constructor(public uid: string, public creatorUID: string, public location: Coordinates , public photoURL: string, 
        public submissions: Array<DocumentReference>){};

>>>>>>> d138c50ce4dfa7a0649cf617fb9fb3fdf29ee20a
}

export const challengeConverter = {
  toFirestore(challenge: Challenge): DocumentData {
    console.log('NOT CONVERTING DOC TO CHALLENGE');
    return {
      uid: challenge.uid,
      creatorUID: challenge.creatorUID,
      location: challenge.location,
      photoURL: challenge.photoURL,
      submissions: challenge.submissions,
    };
  },
  fromFirestore(snapshot: any, options: any): Challenge {
    console.log('CONVERTING DOC TO CHALLENGE');
    const data = snapshot.data(options);
    return new Challenge(
      data.uid,
      data.creatorUID,
      data.location,
      data.photoURL,
      data.submissions
    );
  },
};
