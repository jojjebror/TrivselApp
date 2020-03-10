import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { AuthenticationRoutingModule } from './authentication.routes';

import { views } from './views';

/**
 * Handles oauth authentication callbacks
 */
@NgModule({
	imports: [ 
		SharedModule,
		AuthenticationRoutingModule
	],
	exports: [],
	declarations: [ 
		...views
	],
	providers: [
	]
})
export class AuthenticationModule { 
}