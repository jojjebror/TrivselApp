import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { Office } from '../../models';
import * as fromOffices from '../../../start/state/offices';

@Component({
  selector: 'ex-editOfficeInfoDialog',
  templateUrl: './editOfficeInfoDialog.component.html',
  styleUrls: ['./editOfficeInfoDialog.component.scss'],
})
export class EditOfficeInfoDialogComponent implements OnInit {
  editOfficeInfoForm: FormGroup;
  id: number;
  name: string;
  info: string;
  adress: string;
  swishNumber: string;

  constructor(
    public dialogRef: MatDialogRef<EditOfficeInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditOfficeInfoDialogModel,
    private fb: FormBuilder,
    private store$: Store<AppState>
  ) {
    this.id = data.office.id;
    this.name = data.office.name;
    this.info = data.office.info;
    this.adress = data.office.adress;
    this.swishNumber = data.office.swishNumber;
  }

  ngOnInit() {
    this.createOfficeEditForm();
  }

  createOfficeEditForm() {
    this.editOfficeInfoForm = this.fb.group({
      id: [this.id],
      name: [this.name],
      adress: [this.adress],
      info: [this.info],
      swishnumber: [this.swishNumber],
    });
  }

  updateOffice(officeEditForm) {
    const office = Object.assign({}, officeEditForm.value);
    this.store$.dispatch(new fromOffices.UpdateOffice(office));
  }

  onConfirm(): void {
    if (this.editOfficeInfoForm.valid) {
      this.updateOffice(this.editOfficeInfoForm);
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

export class EditOfficeInfoDialogModel {
  constructor(public office: Office) {}
}