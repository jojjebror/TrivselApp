import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ReceiptComponent } from './views'
import { ReceiptListComponent } from './components/receipt-list/receipt-list.component';




export const routes: Routes = [
    {
      path: '',
      component: ReceiptComponent,
      children: [
        {
            path: '',
            component: ReceiptListComponent
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


