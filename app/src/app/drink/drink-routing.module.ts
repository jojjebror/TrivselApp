import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrinkDetailComponent } from './components/drink-detail/drink-detail.component';
import { DrinkListComponent } from './components/drink-list/drink-list.component';
import { DrinkCreateComponent } from './components/drink-create/drink-create.component';

import { DrinkComponent } from './views';
import { DrinkEditComponent } from './components/drink-edit/drink-edit.component';


export const routes: Routes = [
  {
    path: '',
    component: DrinkComponent,
    children: [
      {
        path: '',
        component: DrinkListComponent
      },
      {
        path: 'create',
        component: DrinkCreateComponent
      },
      {
        path: 'edit',
        component: DrinkEditComponent
      },
      {
        path: ':id',
        component: DrinkDetailComponent
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

