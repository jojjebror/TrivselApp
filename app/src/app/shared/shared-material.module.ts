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
	MatSelectModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatTableModule

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
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule
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