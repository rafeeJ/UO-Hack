export class Submission {
    constructor(public uid: string, public correct: boolean, 
        public created: number , public photoURL: string, public submitterUID: string){ };
}