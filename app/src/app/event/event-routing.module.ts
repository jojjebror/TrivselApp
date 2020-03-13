import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './views';
import { EventDetailComponent } from './components/event-detail/event-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    children: [
      {
        path: '1',
        component: EventDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class LoginRoutingModule {}
