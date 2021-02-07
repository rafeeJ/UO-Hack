import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { Coordinates } from './coordinates';

export class Challenge {
  constructor(
    public uid: string,
    public created: number,
    public creatorUID: string,
    public location: Coordinates,
    public photoURL: string,
    public submissions: Array<DocumentReference>
  ) {}
}

export const challengeConverter = {
  toFirestore(challenge: Challenge): DocumentData {
    console.debug('NOT CONVERTING DOC TO CHALLENGE');
    return {
      uid: challenge.uid,
      created: challenge.created,
      creatorUID: challenge.creatorUID,
      location: challenge.location,
      photoURL: challenge.photoURL,
      submissions: challenge.submissions,
    };
  },
  fromFirestore(snapshot: any, options: any): Challenge {
    console.debug('CONVERTING DOC TO CHALLENGE');
    const data = snapshot.data(options);
    return new Challenge(
      data.uid,
      data.created,
      data.creatorUID,
      data.location,
      data.photoURL,
      data.submissions
    );
  },
};
