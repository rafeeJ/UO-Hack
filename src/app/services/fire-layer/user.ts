import { DocumentReference } from "@angular/fire/firestore";

export class User {
    constructor(public activeChallenge: DocumentReference, public displayName: string,
         public email: string, public photoURL: string, public uid: string) {};
}