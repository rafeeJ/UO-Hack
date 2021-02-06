import { DocumentReference } from "@angular/fire/firestore";
import { Challenge } from "./challenge";

export class User {
    constructor(public activeChallenge: DocumentReference, public displayName: string,
         public email: string, public photoURL: string, public uid: string) {};
}