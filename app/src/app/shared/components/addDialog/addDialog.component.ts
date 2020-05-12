import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'ex-addDialog',
  templateUrl: './addDialog.component.html',
  styleUrls: ['./addDialog.component.scss'],
})
export class AddDialogComponent {
  title: string;
  message: string;
  offices: string[];
  office: string;
  selectedOffice: string;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: AddDialogModel) {
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
  constructor(public title: string, public message: string, public offices: string[], public office: string) {}
}

