import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrinkDetailComponent } from './components/drink-detail/drink-detail.component';
import { DrinkListComponent } from './components/drink-list/drink-list.component';
import { DrinkCreateComponent } from './components/drink-create/drink-create.component';

import { DrinkComponent } from './views';
import { DrinkEditComponent } from './components/drink-edit/drink-edit.component';
import { DrinkCategoryComponent } from './components/drink-category/drink-category.component';
import { DrinkCategory3Component } from './components/drink-category3/drink-category3.component';
import { DrinkCategory2Component } from './components/drink-category2/drink-category2.component';
import { DrinkCreditComponent } from './components/drink-credit/drink-credit.component';
import { DrinkPayCreditComponent } from './components/drink-pay-credit/drink-pay-credit.component';



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
        path: 'category',
        component: DrinkCategoryComponent
      },
      {
        path: 'category2',
        component: DrinkCategory2Component
      },
      {
        path: 'category3',
        component: DrinkCategory3Component
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

