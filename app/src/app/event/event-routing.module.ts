import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './views';

export const routes: Routes = [
  {
    path: '',
    component: EventComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class LoginRoutingModule {}
