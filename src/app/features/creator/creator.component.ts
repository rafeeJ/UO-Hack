import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {

  // true: create challenge view, false: your challenges view.
  createChallengeView = false;

  // 1: take photo, 2: set location
  createStep = 1;
  longitude:string = "";
  latitude:string = "";
  photoURL = "";

  // dummy challenges.
  challenges = [
    {
      creatorUID: "papGVlnShK0Wt8AvI5Lr",
      location: [53.374419438651294, -2.1886388694012915],
      photoURL: "https://firebasestorage.googleapis.com/v0/b/uo-hack.appspot.com/o/EDNRiswXUAAl_t6.jpg?alt=media&token=af9f63d7-e1c3-44f1-b83d-a74b89362fe0",
      submissions: ["submissions/Z9zSlMAB6yyfSryM2Hu8"]
    },
    {
      creatorUID: "papGVlnShK0Wt8AvI5Lr",
      location: [14.174213438675830, -1.182847469407762],
      photoURL: "https://firebasestorage.googleapis.com/v0/b/uo-hack.appspot.com/o/EDNRiswXUAAl_t6.jpg?alt=media&token=af9f63d7-e1c3-44f1-b83d-a74b89362fe0",
      submissions: []
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  cancelCreateChallenge() {
    // Reset location and photoURL.
    this.longitude = "";
    this.latitude = "";
    this.photoURL = null;
    // Reset createStep to 1 (take photo).
    this.createStep = 1;
    // Go back to viewing your challenges.
    this.createChallengeView = false;
  }

  receiveCameraEvent($event:string) {
    // Get photoURL and update here.
    this.photoURL = $event;
    // Move to location step.
    this.createStep = 2;
  }

  createChallenge() {
    // Todo: Add challenge to firestore.
    // Reset the create challenge fields.
    this.cancelCreateChallenge();
    // Go back to you challenges view.
    this.createChallengeView = false;
  }

}
