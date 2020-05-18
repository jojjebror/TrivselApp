import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';

import { ProtectedComponent } from './core/views';
import { AuthenticationGuard, RoleGuard } from './core/guards';

export const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule',
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
  },
  {
    path: '',
    component: ProtectedComponent,
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthenticationGuard],
    children: [
      {
        path: 'start',
        loadChildren: './start/start.module#StartModule',
      },
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canActivate: [RoleGuard],
      },
      {
        path: 'event',
        loadChildren: './event/event.module#EventModule',
      },
      {
        path: 'drink',
        loadChildren: './drink/drink.module#DrinkModule',
      },
      {
        path: 'user',
        loadChildren: './user/user.module#UserModule',
      },
      {
        path: 'receipt',
        loadChildren: './receipt/receipt.module#ReceiptModule',
      },
      {
        path: '',
        redirectTo: 'start',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'start',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule {}
