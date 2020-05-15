import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './views';

export const routes: Routes =
	[
		{
			path: '',
			component: AdminComponent
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