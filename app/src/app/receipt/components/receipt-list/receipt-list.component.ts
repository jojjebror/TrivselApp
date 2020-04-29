import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";


import { AppState } from "src/app/core/state";
import { Receipt } from "src/app/shared/models";

import * as receiptsActions from "../../state/receipts";
import * as fromReceipt from "../../state/receipts/receipts.selectors";


@Component({
  selector: 'ex-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss']
})
export class ReceiptListComponent implements OnInit {
  res$: Observable<Receipt[]>;


  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {
    this.initializeReceipts();
  }

  public initializeReceipts(): void {
    this.store$.dispatch(new receiptsActions.LoadReceipts);
    this.res$ = this.store$.select(fromReceipt.getReceipts);
  }

}
