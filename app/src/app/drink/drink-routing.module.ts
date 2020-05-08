import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrinkDetailComponent } from './components/drink-detail/drink-detail.component';
import { DrinkCreateComponent } from './components/drink-create/drink-create.component';

import { DrinkComponent } from './views';
import { DrinkEditComponent } from './components/drink-edit/drink-edit.component';
import { DrinkCategoryComponent } from './components/drink-category/drink-category.component';
import { DrinkCreditComponent } from './components/drink-credit/drink-credit.component';
import { DrinkPayCreditComponent } from './components/drink-pay-credit/drink-pay-credit.component';



export const routes: Routes = [
  {
    path: '',
    component: DrinkComponent,
    children: [
      {
        path: 'create',
        component: DrinkCreateComponent
      },
      {
        path: 'edit',
        component: DrinkEditComponent
      },
      {
        path: 'category',
        component: DrinkCategoryComponent
      },
      {
        path: 'credit',
        component: DrinkCreditComponent
      },
      {
        path: 'pay',
        component: DrinkPayCreditComponent
      },
      {
        path: ':id',
        component: DrinkDetailComponent
      },
      
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

