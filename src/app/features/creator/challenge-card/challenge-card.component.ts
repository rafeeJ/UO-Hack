import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Challenge } from 'src/app/services/fire-layer/challenge';

@Component({
  selector: 'app-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.scss']
})
export class ChallengeCardComponent implements OnInit {

  @Output() deleteChallengeEvent = new EventEmitter<any>();

  @Input() challenge: Challenge;

  challengeCreated: string;

  constructor() { }

  ngOnInit(): void {
    var dateCreated = new Date(this.challenge.created);
    this.challengeCreated = dateCreated.toLocaleDateString() + ' - ' + dateCreated.toLocaleTimeString().split(':').slice(0, 2).join(':');
  }

  deleteChallenge() {
    if(confirm("Are you sure you wanted to delete?")) {
      this.deleteChallengeEvent.emit(this.challenge);
    } else {
      console.debug('User cancelled.')
    }
    
  }

}