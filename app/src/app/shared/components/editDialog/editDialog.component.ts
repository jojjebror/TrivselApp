import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'ex-editDialog',
  templateUrl: './editDialog.component.html',
  styleUrls: ['./editDialog.component.scss'],
})
export class EditDialogComponent {
  title: string;
  message: string;
  offices: string[];
  office: string;
  selectedOffice: string;

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: EditDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.offices = data.offices;
    this.selectedOffice = data.office
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
    this.data.office = this.selectedOffice
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

export class EditDialogModel {
  constructor(public title: string, public message: string, public offices: string[], public office: string) {}
}

