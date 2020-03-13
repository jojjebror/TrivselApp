import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { components } from './components';
import { directives } from './directives';
import { pipes } from './pipes';

import { SharedMaterialModule } from './shared-material.module';

/**
 * Contains all shared stuff for the application. This module
 * should be imported in all other app modules.
 */
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedMaterialModule,
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedMaterialModule,

		...components,
		...directives,
		...pipes
	],
	declarations: [
		...components,
		...directives,
		...pipes,
	]
})
export class SharedModule {

}
