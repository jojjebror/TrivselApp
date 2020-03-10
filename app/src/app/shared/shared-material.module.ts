import { NgModule } from '@angular/core';

import {
	MatIconModule,
	MatButtonModule,
	MatInputModule,
	MatCardModule,
	MatListModule,
	MatDialogModule,
	MatTabsModule,
	MatSidenavModule,
	MatToolbarModule,
	MatRippleModule,
	MatMenuModule,
	MatSnackBarModule,
	MatSlideToggleModule,
	MatSelectModule
} from '@angular/material';

const modules = [
	MatIconModule,
	MatButtonModule,
	MatInputModule,
	MatCardModule,
	MatListModule,
	MatDialogModule,
	MatTabsModule,
	MatSidenavModule,
	MatToolbarModule,
	MatRippleModule,
	MatMenuModule,
	MatSnackBarModule,
	MatSlideToggleModule,
	MatSelectModule
];

@NgModule({
	imports: [
		...modules
	],
	exports: [
		...modules
	]
})
export class SharedMaterialModule {

}