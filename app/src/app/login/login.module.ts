import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { LoginRoutingModule } from './login-routing.module';

import { views } from './views';
import { components } from './components';

@NgModule({
	imports: [
		SharedModule,
		LoginRoutingModule
	],
	exports: [],
	declarations: [
		...views,
		...components
	],
	providers: [
	]
})
export class LoginModule { }
