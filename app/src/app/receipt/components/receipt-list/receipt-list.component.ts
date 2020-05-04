import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";


import { AppState } from "src/app/core/state";
import { Receipt } from "src/app/shared/models";

import * as receiptsActions from "../../state/receipts";
import * as fromReceipt from "../../state/receipts/receipts.selectors";
import * as asReceipt from "../../state/receipts/receipts.actions";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertifyService } from "src/app/core/services/alertify.service";
import { MatSnackBar } from "@angular/material";


@Component({
  selector: 'ex-receipt-list',
  templateUrl: './receipt-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./receipt-list.component.scss']
})
export class ReceiptListComponent implements OnInit {
  res$: Observable<Receipt[]>;
  fileUpload: File = null;
  imageUrl: string;
  receiptForm: FormGroup;
  receipt: Receipt;

  constructor(
    private store$: Store<AppState>,
    private router: Router,
    private rb: FormBuilder,
    private alertify: AlertifyService,
    private snackBar: MatSnackBar,
    ) 
    { }

  ngOnInit(): void {
    this.createReceiptForm();
    this.initializeReceipts();
  }

  createReceiptForm() {
    this.receiptForm = this.rb.group({
      image: [''],
    });
  }

  createReceipt() {
    if (this.receiptForm.valid) {

      this.receipt = Object.assign({}, this.receiptForm.value);

      this.store$.dispatch(new asReceipt.CreateReceipt(this.receipt, this.fileUpload));
      this.snackBar.open('Kvitto har uppladdats', '', { duration: 2500 });
    }
  }

  imageValidator(control: FormControl) {
    //Får inte att fungera med formbuilder
    if(control.value) {
      if(this.fileUpload) {
        const allowedInput = '/image-*/';
        //const fileExtension = this.fileUpload.name.split('.').pop().toLowerCase();
        const fileExtension = this.fileUpload.type;
        console.log(fileExtension);
        if (fileExtension.match(allowedInput)) {
          return true;
        }
        return false;
      }
    }
  }
  
  public initializeReceipts(): void {
    this.store$.dispatch(new receiptsActions.LoadReceipts);
    this.res$ = this.store$.select(fromReceipt.getReceipts);
  }

  loadImage(file: FileList) {
    this.fileUpload = file.item(0);
  }
  
}
