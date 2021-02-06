import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  @Output() cameraEvent = new EventEmitter<string>();

  // Latest snapshot
  webcamImage: WebcamImage = null;

  // Switch between live webcam and image preview.
  showWebcam = true;

  // Webcam options
  multipleWebcamsAvailable = false;
  videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  errors: WebcamInitError[] = [];

  // Webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }

  capture(): void {
    // Take picture.
    this.trigger.next();
    // Switch to image preview.
    this.toggleWebcam();
  }

  toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  emitCameraEvent() {
    // Upload this.webcamImage to firestore.
    // Get url.
    var photoURL = 'placeholder';
    // Emit image.
    this.cameraEvent.emit(photoURL);
    // Reset camera.
    this.toggleWebcam();
  }
}
