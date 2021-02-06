import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from 'src/app/services/fire-layer/challenge';

@Component({
  selector: 'app-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.scss']
})
export class ChallengeCardComponent implements OnInit {

  constructor() { }

  //@Input() challenge: Challenge;
  @Input() challenge: any;

  ngOnInit(): void {
  }

}
