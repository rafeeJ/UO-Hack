import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CameraComponent } from '../../camera/camera.component';

@Component({
  selector: 'app-explorer-take-photo',
  templateUrl: './explorer-take-photo.component.html',
  styleUrls: ['./explorer-take-photo.component.scss'],
})
export class ExplorerTakePhotoComponent implements OnInit {
  @Output() notifyViewMap = new EventEmitter<any>();
  @Output() notifyViewPhoto = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
