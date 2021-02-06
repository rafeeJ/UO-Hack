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

  title = 'Phallenges!';

  onNotifyViewMap(status: boolean) {
    this.viewMap = status;
    this.viewPhoto = !status;
  }
}
