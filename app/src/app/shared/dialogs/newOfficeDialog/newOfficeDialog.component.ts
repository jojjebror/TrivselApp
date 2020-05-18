import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as fromOffices from '../../../start/state/offices';

@Component({
  selector: 'ex-newOfficeDialog',
  templateUrl: './newOfficeDialog.component.html',
  styleUrls: ['./newOfficeDialog.component.scss'],
})
export class NewOfficeDialogComponent implements OnInit {
  addOfficeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewOfficeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewOfficeDialogModel,
    private fb: FormBuilder,
    private store$: Store<AppState>
  ) {}

  ngOnInit() {
    this.createOfficeForm();
  }

  createOfficeForm() {
    this.addOfficeForm = this.fb.group({
      name: ['', Validators.required],
      adress: ['', Validators.required],
      swishNumber: [''],
      info: ['']
    });
  }

  addOffice(addOfficeForm) {
    const office = Object.assign({}, addOfficeForm.value);
    this.store$.dispatch(new fromOffices.CreateOffice(office));
  }

  onConfirm(): void {
    if (this.addOfficeForm.valid) {
      this.addOffice(this.addOfficeForm);
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

export class NewOfficeDialogModel {
  constructor() {}
}

