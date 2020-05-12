import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Office } from '../../models';
import { getLoadingData, getLoadingByKey } from '../../../core/state/loading';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';


@Component({
  selector: 'ex-addDialog',
  templateUrl: './addDialog.component.html',
  styleUrls: ['./addDialog.component.scss'],
})
export class AddDialogComponent {
  loadings$ = this.store$.pipe(select(getLoadingData));

  title: string;
  message: string;
  offices: Office[];
  office: Office;
  selectedOffice: Office;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AddDialogModel, private store$: Store<AppState>) {
    dialogRef.disableClose = true;

    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.offices = data.offices;
    this.selectedOffice = data.offices[0];
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
    this.data.office = this.selectedOffice;
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

export class AddDialogModel {
  constructor(public title: string, public message: string, public offices: Office[], public office: Office) {}
}

