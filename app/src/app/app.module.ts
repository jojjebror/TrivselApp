import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core';


/*import { environment } from '../environments/environment';*/

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,

		CoreModule,
		AppRoutingModule,
	/* 	AngularFireModule.initializeApp(environment.firebase) */

	],
	declarations: [
		AppComponent,
	],
	bootstrap: [
		AppComponent
	],
	providers: [
	]
})
export class AppModule { }