import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExampleComponent } from './views';

export const routes: Routes =
	[
		{
			path: '',
			component: ExampleComponent
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