import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { CreatorComponent } from './features/creator/creator.component';
import { AuthGuard } from './services/auth-guard/auth.guard'

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'create', component: CreatorComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
