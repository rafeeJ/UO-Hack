import { Component, Input } from '@angular/core';

import { ExplorerMapComponent } from './explorer-map/explorer-map.component';
import { ExplorerTakePhotoComponent } from './explorer-take-photo/explorer-take-photo.component';
import { ExplorerViewPhotoComponent } from './explorer-view-photo/explorer-view-photo.component';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
})
export class ExplorerComponent {
  viewMap = true;
  viewPhoto = false;
  takePhoto = false;
  challenge: any;
  prevLocation: any[];

  title = 'Phallenges!';

  onNotifyViewMap(prevLocation: []) {
    this.viewMap = true;
    this.viewPhoto = false;
    this.takePhoto = false;
    this.prevLocation = prevLocation;
  }

  onNotifyViewPhoto(challenge: any) {
    this.viewMap = false;
    this.viewPhoto = true;
    this.takePhoto = false;
    this.challenge = challenge;
  }

  onNotifyTakePhoto() {
    this.viewMap = false;
    this.viewPhoto = false;
    this.takePhoto = true;
  }
}
