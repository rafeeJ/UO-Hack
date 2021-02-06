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
import { Coordinates } from 'src/app/services/fire-layer/coordinates';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {

  // dummy challenges.
  challenges: Challenge[] = [];

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
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user_input => {
      // Set the current user.
      this.user = user_input;
      // Set the current user's challenges.
      this.updateChallenges();
    });
    // Load map.
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  private updateChallenges() {
    this.fireLayerService.getCreatedChallenges(this.user.uid).subscribe(challengeQueryResult => {
      var newChallenges: Challenge[] = [];
      challengeQueryResult.docs.forEach(challengeDocument => newChallenges.push(challengeDocument.data()))
      this.challenges = newChallenges;
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

  receiveDeleteChallengeEvent($event: Challenge) {
    this.fireLayerService.deleteChallenge($event.uid);
    this.updateChallenges();
  }

  markerDragEnd($event: google.maps.MouseEvent) {
    this.lat = $event.latLng.lat();
    this.lng = $event.latLng.lng();
  }

  createChallenge() {
    // Build a Challenge object from user data.
    var challenge: Challenge = new Challenge(uid(), this.user.uid, new Coordinates(this.lng, this.lat), this.photoURL, []);
    // Add the new challenge to Firestore.
    this.fireLayerService.createChallenge(challenge);
    // Reset the create challenge fields.
    this.cancelCreateChallenge();
    // Add the new challenge.
    this.updateChallenges();
    // Go back to you challenges view.
    this.createChallengeView = false;
  }

}


