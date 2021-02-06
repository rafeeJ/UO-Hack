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

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private fireService: FireLayerService
  ) {}

  challenges: any = [];

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
      this.userLocation = true;
    });

    this.fireService
      .getAllChallenges()
      .subscribe((data: { payload: { doc: { id: any } } }[]) => {
        if (data) {
          data.map((test: { payload: { doc: { id: any } } }) => {
            if (
              !this.challenges.some(
                (e: any) => e.doc.id === test.payload.doc.id
              )
            ) {
              console.log(test.payload.doc);
              this.challenges.push(test.payload.doc);
            }
          });
          console.log(this.challenges);
        }
      });
  }

  title = 'Phallenges!';

  // google maps zoom level
  zoom: number = 12;

  // initial center position for the map
  lat: number = 53.94683859574885;
  lng: number = -1.0308574426583503;

  geoCoder: google.maps.Geocoder | undefined;
  userLocation = false;

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  clickedMarker(challenge: any) {
    console.log(challenge);
    this.notifyViewPhoto.emit(challenge);
  }
}
