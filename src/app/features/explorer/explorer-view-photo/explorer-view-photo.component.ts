import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-explorer-view-photo',
  templateUrl: './explorer-view-photo.component.html',
  styleUrls: ['./explorer-view-photo.component.scss'],
})
export class ExplorerViewPhotoComponent implements OnInit {
  @Output() notifyViewMap = new EventEmitter<any>();
  @Output() notifyTakePhoto = new EventEmitter<any>();
  @Input() challenge: any;

  constructor() {}

  ngOnInit(): void {
    console.log(this.challenge);
  }

  submitClicked() {
    this.notifyTakePhoto.emit();
  }
}
