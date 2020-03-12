import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrinkComponent } from './views';

export const routes: Routes = [
  {
    path: '',
    component: DrinkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class LoginRoutingModule {}
