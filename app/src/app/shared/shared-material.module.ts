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
	MatTableModule,
	MatTooltipModule,
	MatBadgeModule,
	MatPaginatorModule,
	MatSortModule,
	MatGridListModule
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
  MatTableModule,
  MatTooltipModule,
  MatBadgeModule,
  MatPaginatorModule,
  MatSortModule,
  MatGridListModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class SharedMaterialModule {}