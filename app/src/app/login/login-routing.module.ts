import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views';

export const routes: Routes =
	[
		{
			path: '',
			component: LoginComponent,
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
export class LoginRoutingModule {
}