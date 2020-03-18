import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';

import { ProtectedComponent } from './core/views';
import { AuthenticationGuard } from './core/guards';

<<<<<<< HEAD
export const routes: Routes = [
         {
           path: 'authentication',
           loadChildren: './authentication/authentication.module#AuthenticationModule'
         },
         {
           path: 'login',
           loadChildren: './login/login.module#LoginModule'
         },
         {
           path: '',
           component: ProtectedComponent,
           canActivate: [AuthenticationGuard],
           canActivateChild: [AuthenticationGuard],
           children: [
             {
               path: 'start',
               loadChildren: './start/start.module#StartModule'
             },
             {
               path: 'exempel',
               loadChildren: './example/example.module#ExampleModule'
             },
             {
               path: 'event',
               loadChildren: './event/event.module#EventModule'
             },
             {
              path: 'drink',
              loadChildren: './drink/drink.module#DrinkModule'
            },
             {
               path: '',
               redirectTo: 'start',
               pathMatch: 'full'
             }
           ]
         }
       ];
=======
export const routes: Routes = 
	[
		{
			path: 'authentication',
			loadChildren: './authentication/authentication.module#AuthenticationModule'
		},
		{
			path: 'login',
			loadChildren: './login/login.module#LoginModule'
		},
		{
			path: '',
			component: ProtectedComponent,
			canActivate: [
				AuthenticationGuard
			],
			canActivateChild: [
				AuthenticationGuard
			],
			children: [
				{
					path: 'start',
					loadChildren: './start/start.module#StartModule'
				},
				{
					path: 'exempel',
					loadChildren: './example/example.module#ExampleModule'
				},
				{
					path: 'event',
					loadChildren: './event/event.module#EventModule'
				},
				{
					path: 'drink',
					loadChildren: './drink/drink.module#DrinkModule'
				},
				{
					path: '',
					redirectTo: 'start',
					pathMatch: 'full'
				},
				{
					path: '**',
					redirectTo: 'start',
					pathMatch: 'full'
				}
			]
		}
	];
>>>>>>> ccda7fc5b7403c031c2e8f1b6c37467e56dd43e0

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [
		RouterModule
	],
	declarations: [
	],
	providers: [
	]
})
export class AppRoutingModule {
}