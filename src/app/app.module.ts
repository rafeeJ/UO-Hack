import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExplorerComponent } from './features/explorer/explorer.component';
import { CreatorComponent } from './features/creator/creator.component';
import { LandingComponent } from './features/landing/landing.component';

// Firebase Stuff here
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AgmCoreModule } from '@agm/core';

import { ExplorerMapComponent } from './features/explorer/explorer-map/explorer-map.component';
import { ExplorerViewPhotoComponent } from './features/explorer/explorer-view-photo/explorer-view-photo.component';
import { ExplorerTakePhotoComponent } from './features/explorer/explorer-take-photo/explorer-take-photo.component';

const firebaseConfig = {
  apiKey: 'AIzaSyAFq476GBDeLZ9IoUe_h18bmU9xB80u4Vg',
  authDomain: 'uo-hack.firebaseapp.com',
  projectId: 'uo-hack',
  storageBucket: 'uo-hack.appspot.com',
  messagingSenderId: '141495585202',
  appId: '1:141495585202:web:5ac13ad77dd7eda99f3cab',
};
@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent,
    CreatorComponent,
    LandingComponent,
    ExplorerMapComponent,
    ExplorerViewPhotoComponent,
    ExplorerTakePhotoComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbbAAEM1SSnu5Ef6NcylXc4f1a2XQM5aI', // Google maps api key
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
