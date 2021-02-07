import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-explorer-view-photo',
  templateUrl: './explorer-view-photo.component.html',
  styleUrls: ['./explorer-view-photo.component.scss'],
})
export class ExplorerViewPhotoComponent implements OnInit {
  @Output() notifyViewMap = new EventEmitter<any>();
  @Output() notifyTakePhoto = new EventEmitter<any>();
  @Input() challenge: any;

  timeSinceChallengeSet: string;

  constructor() {}

  ngOnInit(): void {
    var currentDate = Date.now();
    var secondsSinceChallengeSet = currentDate - this.challenge.data().created;
    this.timeSinceChallengeSet = Math.floor((secondsSinceChallengeSet / (60 * 60 * 24))).toString() + ' days';
  }

  submitClicked() {
    this.notifyTakePhoto.emit();
  }

  back() {
    console.debug(this.challenge.data().location);
    this.notifyViewMap.emit(this.challenge.data().location);
  }
}
