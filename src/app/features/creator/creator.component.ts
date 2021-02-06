import { MapsAPILoader } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable } from 'rxjs';
import { AngularFireStorage  } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { uid } from 'uid';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Challenge } from 'src/app/services/fire-layer/challenge';
import { FireLayerService } from 'src/app/services/fire-layer/fire-layer.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {

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

  // true: create challenge view, false: your challenges view.
  createChallengeView = false;

  // 1: take photo, 2: set location
  createStep = 1;

  user: User;

  // Google Maps zoom level.
  zoom: number = 12;

  // URL of the challenge photo.
  photoURL: string = "";

  // Initial center position for the map, incase cannot get current location.
  lat: number = 53.94683859574885;
  lng: number = -1.0308574426583503;

  geoCoder: google.maps.Geocoder | undefined;
  userLocation = false;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private fireLayerService: FireLayerService,
    private authService: AuthService,
    private storage: AngularFireStorage
  ) {
    this.authService.user$.subscribe(user_input => {this.user = user_input});
  }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
        this.userLocation = true;
      });
    }
  }

  cancelCreateChallenge() {
    // Reset location.
    this.lat = 53.94683859574885;
    this.lng = -1.0308574426583503;
    this.setCurrentLocation(); // Get current location if possible.
    // Reset photoURL.
    this.photoURL = null;
    // Put createStep back to 1 i.e. taking photo.
    this.createStep = 1;
    // hide the create challenge components.
    this.createChallengeView = false;
  }

  async receiveCameraEvent($event: WebcamImage) {
    // Convert WebcamImage ImageData to Blob.
    let canvas = document.createElement('canvas');
    canvas.width = $event.imageData.width;
    canvas.height = $event.imageData.height;
    let context = canvas.getContext('2d');
    context.putImageData($event.imageData, 0, 0); 
    let blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
    // Upload webcam image to the Firebase storage bucket.
    const filePath = uid() + '.jpeg'; // Generate a unique id for the filename.
    const fileRef = this.storage.ref(filePath);
    const task = fileRef.put(blob);
    // Update the photoURL once it has been uploaded.
    task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(downloadURL => this.photoURL = downloadURL) )
    )
    .subscribe()
    // Picture has been selected so move to the location choosing step.
    this.createStep = 2;
  }

  markerDragEnd($event: google.maps.MouseEvent) {
    this.lat = $event.latLng.lat();
    this.lng = $event.latLng.lng();
  }

  createChallenge() {
    // Build a Challenge object from user data.
    var challenge: Challenge = new Challenge('testUID', this.user.uid, [this.lng, this.lat], this.photoURL, []);
    // Add the new challenge to Firestore.
    this.fireLayerService.createChallenge(challenge);
    // Reset the create challenge fields and go back to viewing all challenges.
    this.cancelCreateChallenge();
  }

}


