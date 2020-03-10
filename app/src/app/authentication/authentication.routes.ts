import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent, LogoutComponent } from './views';

export const routes: Routes =
	[
		{
			path: 'redirect',
			component: LoginComponent
		},
		{
			path: 'logout/redirect',
			component: LogoutComponent
		}
	];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	],
	declarations: [
	],
	providers: [
	]
})
export class AuthenticationRoutingModule {
}
