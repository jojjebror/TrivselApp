import { Component, OnInit, Inject } from '@angular/core';
import { EditDialogComponent } from '../editDialog/editDialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Office } from '../../models';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as fromOffices from '../../../start/state/offices';


@Component({
  selector: 'ex-editOfficeDetailsDialog',
  templateUrl: './editOfficeDetailsDialog.component.html',
  styleUrls: ['./editOfficeDetailsDialog.component.scss'],
})
export class EditOfficeDetailsDialogComponent implements OnInit {
  officeEditForm: FormGroup;
  id: number;
  name: string;
  adress: string;
  swish: string;

  constructor(
    public dialogRef: MatDialogRef<EditOfficeDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditOfficeDetailsDialogModel,
    private fb: FormBuilder,
    private store$: Store<AppState>
  ) {
    // Update view with given values
    this.id = data.office.id;
    this.name = data.office.name;
    this.adress = data.office.adress;
    this.swish = data.office.swishNumber;
  }

  ngOnInit() {
    this.createOfficeEditForm();
  }

  createOfficeEditForm() {
    this.officeEditForm = this.fb.group({
      id: [this.id],
      name: [this.name, Validators.required],
      adress: [this.adress, Validators.required],
      swishNumber: [this.swish, Validators.required],
    });
  }

  updateOffice(officeEditForm) {
    const office = Object.assign({}, officeEditForm.value);
    this.store$.dispatch(new fromOffices.UpdateOffice(office));
    }
  

  onConfirm(): void {
    if (this.officeEditForm.valid) {
    this.updateOffice(this.officeEditForm);
    this.dialogRef.close(true);
    }
    else {
    this.dialogRef.close(false);
    }
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

export class EditOfficeDetailsDialogModel {
  constructor(public office: Office) {}
}
