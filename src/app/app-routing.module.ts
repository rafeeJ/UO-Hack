import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExplorerComponent } from './features/explorer/explorer.component';
import { CreatorComponent } from './features/creator/creator.component';
import { LandingComponent } from './features/landing/landing.component';

const routes: Routes = [{ path: 'explorer', component: ExplorerComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
