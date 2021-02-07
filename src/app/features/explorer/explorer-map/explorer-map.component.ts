import { MapsAPILoader } from '@agm/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExplorerComponent } from '../explorer.component';
import { FireLayerService } from '../../../services/fire-layer/fire-layer.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-explorer-map',
  templateUrl: './explorer-map.component.html',
  styleUrls: ['./explorer-map.component.scss'],
})
export class ExplorerMapComponent {
  @Output() notifyViewPhoto = new EventEmitter<any>();
  @Output() notifyTakePhoto = new EventEmitter<any>();
  @Input() prevLocation: any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private fireService: FireLayerService
  ) {}

  challenges: any = [];
  lat: number;
  lng: number;
  userLat: number;
  userLng: number;

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
    });

    this.fireService.getAllChallenges().subscribe((data: any) => {
      if (data) {
        data.forEach((challengeDoc: any) => {
          this.challenges.push(challengeDoc);
        })
      }
    });
  }

  title = 'Phallenges!';

  // google maps zoom level
  zoom: number = 12;

  geoCoder: google.maps.Geocoder | undefined;

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLat = position.coords.latitude;
        this.userLng = position.coords.longitude;
        this.zoom = 12;

        if (this.prevLocation == undefined || this.prevLocation == null) {
          this.lat = this.userLat || 53.94683859574885;
          this.lng = this.userLng || -1.0308574426583503;
        } else {
          this.lat = this.prevLocation.latitude;
          this.lng = this.prevLocation.longitude;
        }
      });
    }
  }

  clickedMarker(challenge: any) {
    this.notifyViewPhoto.emit(challenge);
  }
}
