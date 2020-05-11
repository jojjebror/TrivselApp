import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../app/shared';
import { CoreModule } from './core';
import { RouterModule, Routes } from '@angular/router';

//import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		SharedModule,
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