import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable } from 'rxjs';
import { AngularFireStorage  } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { uid } from 'uid';

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
  photoURL:string="";

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

  constructor(private storage: AngularFireStorage) { }

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

  async receiveCameraEvent($event:WebcamImage) {
    // Convert WebcamImage to Blob.
    let canvas = document.createElement('canvas');
    canvas.width = $event.imageData.width;
    canvas.height = $event.imageData.height;
    let context = canvas.getContext('2d');
    context.putImageData($event.imageData, 0, 0); 
    let blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
    
    // Upload webcam image.
    const filePath = uid() + '.jpeg';
    const fileRef = this.storage.ref(filePath);
    // const task = this.storage.upload(filePath, $event.imageAsDataUrl);
    const task = fileRef.put(blob);
   
    // Update the photoURL once it has been uploaded.
    task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(downloadURL => this.photoURL = downloadURL) )
    )
    .subscribe()

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
