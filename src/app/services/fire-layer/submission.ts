export class Submission {
    constructor(public uid: string, public correct: boolean, 
        public created: string , public photoURL: string, public submitterUID: string){ };
}