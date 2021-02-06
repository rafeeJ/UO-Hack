import { MapsAPILoader } from '@agm/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExplorerComponent } from '../explorer.component';

@Component({
  selector: 'app-explorer-map',
  templateUrl: './explorer-map.component.html',
  styleUrls: ['./explorer-map.component.scss'],
})
export class ExplorerMapComponent {
  _status: boolean = true;
  @Output() notifyViewMap = new EventEmitter<boolean>();
  @Input('viewMap')
  set status(status: boolean) {
    this._status = status || true;
    console.log(status);
  }
  get status(): boolean {
    return this._status;
  }

  title = 'Phallenges!';

  // google maps zoom level
  zoom: number = 12;

  circles = [
    {
      label: 'Challenge 1',
      lat: 53.9568,
      lng: -1.0308,
    },
    {
      label: 'Challenge 2',
      lat: 53.9578,
      lng: -1.0218,
    },
    {
      label: 'Challenge 3',
      lat: 53.9448,
      lng: -1.0518,
    },
    {
      label: 'Challenge 4',
      lat: 53.9328,
      lng: -1.0278,
    },
  ];

  // initial center position for the map
  lat: number = 53.94683859574885;
  lng: number = -1.0308574426583503;

  geoCoder: google.maps.Geocoder | undefined;
  userLocation = false;

  constructor(private mapsAPILoader: MapsAPILoader) {}

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
      this.userLocation = true;
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  clickedMarker() {
    console.log('Marker Clicked');
  }

  clickedButton() {
    this.notifyViewMap.emit(false);
  }
}
