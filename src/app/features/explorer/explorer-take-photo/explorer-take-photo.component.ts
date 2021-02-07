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
    console.debug(this.challenge.data());
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
            .subscribe((downloadURL) => {
              this.photoURL = downloadURL;
              var date = new Date();
              var timestamp = date.getTime();
              var subID = uid();
              var submission: Submission = new Submission(
                subID,
                null,
                timestamp,
                this.photoURL,
                this.user.uid
              );
              this.fireLayerService.createSubmission(submission).then((id) => {

                var submissions = this.challenge.data().submissions;
                submissions.push(subID);

                var challenge: Challenge = new Challenge(
                  this.challenge.data().uid,
                  this.challenge.data().created,
                  this.challenge.data().creatorUID,
                  this.challenge.data().location,
                  this.challenge.data().photoURL,
                  submissions
                );
                console.debug(challenge);
                this.fireLayerService.updateChallenge(challenge);

                alert('Your image has been submitted!');
                this.notifyViewMap.emit();
                      })
                    })
        ))
      .subscribe();
  }
}
