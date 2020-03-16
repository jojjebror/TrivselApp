import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrinkComponent } from './views';
import { DrinkListComponent } from './components/drink-list/drink-list.component';
import { DrinkDetailComponent } from './components/drink-detail/drink-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: DrinkComponent,
    children: [
      {
        path: '',
        component: DrinkListComponent,
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
