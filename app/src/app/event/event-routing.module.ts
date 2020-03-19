import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './views';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    children: [
      {
        path: '',
        component: EventListComponent
      },
      {
        path: 'create',
        component: EventCreateComponent
      },
      {
        path: 'edit/:id',
        component: EventEditComponent
      },
      {
        path: ':id',
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
