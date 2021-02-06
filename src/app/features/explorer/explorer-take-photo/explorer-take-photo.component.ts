import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { WebcamImage } from 'ngx-webcam';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Challenge } from 'src/app/services/fire-layer/challenge';
import { FireLayerService } from 'src/app/services/fire-layer/fire-layer.service';
import { Submission } from 'src/app/services/fire-layer/submission';
import { User } from 'src/app/services/fire-layer/user';
import { uid } from 'uid';
import { CameraComponent } from '../../camera/camera.component';

@Component({
  selector: 'app-explorer-take-photo',
  templateUrl: './explorer-take-photo.component.html',
  styleUrls: ['./explorer-take-photo.component.scss'],
})
export class ExplorerTakePhotoComponent implements OnInit {
  @Output() notifyViewMap = new EventEmitter<any>();
  @Output() notifyViewPhoto = new EventEmitter<any>();
  @Input() challenge: any;

  constructor(
    private storage: AngularFireStorage,
    private authService: AuthService,
    private fireLayerService: FireLayerService
  ) {
    this.authService.user$.subscribe((user_input) => {
      this.user = user_input;
    });
  }

  ngOnInit(): void {
    console.log(this.challenge.data());
  }

  photoURL: string = '';
  user: User;

  async receiveCameraEvent($event: WebcamImage) {
    // Convert WebcamImage to Blob.
    let canvas = document.createElement('canvas');
    canvas.width = $event.imageData.width;
    canvas.height = $event.imageData.height;
    let context = canvas.getContext('2d');
    context.putImageData($event.imageData, 0, 0);
    let blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg')
    );

    // Upload webcam image.
    const filePath = uid() + '.jpeg';
    const fileRef = this.storage.ref(filePath);
    // const task = this.storage.upload(filePath, $event.imageAsDataUrl);
    const task = fileRef.put(blob);

    // Update the photoURL once it has been uploaded.
    task
      .snapshotChanges()
      .pipe(
        finalize(() =>
          fileRef
            .getDownloadURL()
            .subscribe((downloadURL) => (this.photoURL = downloadURL))
        )
      )
      .subscribe();

    var date = new Date();
    var timestamp = new Timestamp(date.getTime(), 0);
    var submission: Submission = new Submission(
      uid(),
      false,
      String(timestamp),
      this.photoURL,
      this.user.uid
    );
    var subID;
    this.fireLayerService.createSubmission(submission).then((id) => {
      subID = id;

      var submissions = this.challenge.data().submissions;
      submissions.push(subID);

      var challenge: Challenge = new Challenge(
        this.challenge.id,
        this.challenge.data().creatorUID,
        this.challenge.data().location,
        this.challenge.data().photoURL,
        submissions
      );
      console.log(challenge);
      this.fireLayerService.updateChallenge(challenge);
    });
  }
}
