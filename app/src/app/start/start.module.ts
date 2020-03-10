import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { StartRoutingModule } from './start-routing.module';

import { views } from './views';

@NgModule({
	imports: [ 
		SharedModule,
		StartRoutingModule
	],
	exports: [],
	declarations: [ 
		...views
	],
	providers: [],
})
export class StartModule { }
