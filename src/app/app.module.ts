import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { WebcamModule } from 'ngx-webcam';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExplorerComponent } from './features/explorer/explorer.component';
import { CreatorComponent } from './features/creator/creator.component';
import { LandingComponent } from './features/landing/landing.component';
import { CameraComponent } from './features/camera/camera.component';
import { TopNavBarComponent } from './features/global/top-nav-bar/top-nav-bar.component';

// Firebase stuff here
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
//import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material stuff here
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { BottomNavBarComponent } from './features/global/bottom-nav-bar/bottom-nav-bar.component';

import { AgmCoreModule } from '@agm/core';

import { ExplorerMapComponent } from './features/explorer/explorer-map/explorer-map.component';
import { ExplorerViewPhotoComponent } from './features/explorer/explorer-view-photo/explorer-view-photo.component';
import { ExplorerTakePhotoComponent } from './features/explorer/explorer-take-photo/explorer-take-photo.component';
import { ChallengeCardComponent } from './features/creator/challenge-card/challenge-card.component';
import { LeaderboardComponent } from './features/leaderboard/leaderboard.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ModeratorComponent } from './features/moderator/moderator.component';
import { StopPropDirective } from './features/explorer/stop-prop.directive';

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
    CameraComponent,
    TopNavBarComponent,
    BottomNavBarComponent,
    ChallengeCardComponent,
    LeaderboardComponent,
    ProfileComponent,
    ModeratorComponent,
    StopPropDirective,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    //AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbbAAEM1SSnu5Ef6NcylXc4f1a2XQM5aI', // Google maps api key
    }),
    AppRoutingModule,
    WebcamModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    HttpModule,
  ],
  providers: [{ provide: BUCKET, useValue: 'uo-hack.appspot.com' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
