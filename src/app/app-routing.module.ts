import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { ExplorerComponent } from './features/explorer/explorer.component';
import { CreatorComponent } from './features/creator/creator.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { LeaderboardComponent } from './features/leaderboard/leaderboard.component';
import { ProfileComponent } from './features/profile/profile.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'explorer', component: ExplorerComponent },
  { path: '', component: LandingComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create', component: CreatorComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
