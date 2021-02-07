import { Component, OnInit } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';

@Component({
  selector: 'app-bottom-nav-bar',
  templateUrl: './bottom-nav-bar.component.html',
  styleUrls: ['./bottom-nav-bar.component.scss'],
  animations: speedDialFabAnimations
})
export class BottomNavBarComponent {

  fabButtons = [
    {
      icon: 'home',
      route: ['/']
    },
    {
      icon: 'add_location_alt',
      route: ['/create']
    },
    {
      icon: 'map',
      route: ['/explorer']
    },
    {
      icon: 'leaderboard',
      route: ['/leaderboard']
    }
  ];
  
  buttons: any = [];
  fabTogglerState = 'inactive';

  constructor() { }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

}
