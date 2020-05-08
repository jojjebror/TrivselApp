import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { switchMap, map, mergeMap, catchError, tap } from "rxjs/operators";

import { Router } from "@angular/router";

import * as receiptsActions from "./receipts.actions";
import { Receipt } from "src/app/shared/models";
import { ReceiptResource } from '../../../core/resources/receipt.resource';


@Injectable()
export class ReceiptsEffects {
  constructor(
    private actions$: Actions,
    private receiptResource: ReceiptResource,
    private router: Router
  ) {}
  

  @Effect()
  loadReceipts$: Observable<Action> = this.actions$.pipe(
      ofType(receiptsActions.ActionTypes.LOAD_RECEIPTS),
      switchMap(() => {
        return this.receiptResource.loadReceipts().pipe(
          map((receipts: Receipt[]) => new receiptsActions.LoadReceiptsSuccess(receipts)),
          catchError((err) => of(new receiptsActions.LoadReceiptsError(err)))
        );
      })
  );

  @Effect()
  loadUsersReceipts$: Observable<Action> = this.actions$.pipe(
    ofType(receiptsActions.ActionTypes.LOAD_USER_RECEIPTS),
    switchMap((actions: receiptsActions.LoadUserReceipts) =>
      this.receiptResource.loadCurrentReceipts(actions.payload).pipe(
        map((receipt: Receipt[]) => new receiptsActions.LoadUserReceiptsSuccess(receipt)),
        catchError((err) => of(new receiptsActions.LoadUserReceiptsError(err)))
      )
    )
  );

  @Effect()
  createReceipt$:Observable<Action> = this.actions$.pipe(
      ofType(receiptsActions.ActionTypes.CREATE_RECEIPT),
      switchMap((action: receiptsActions.CreateReceipt) =>
        this.receiptResource.createReceipt(action.payload).pipe(
            map((newReceipt: Receipt) => {
              if (action.image !== null) {
                return new receiptsActions.UploadImage(newReceipt.id, action.image);
              }
            
               new receiptsActions.CreateReceiptSuccess(newReceipt)
            }),
            tap(() => this.router.navigate(['/receipt'])),
            catchError((err) => of(new receiptsActions.CreateReceiptError(err)))
        )
    )
  );

  @Effect()
  deleteReceipt$: Observable<Action> = this.actions$.pipe(
    ofType(receiptsActions.ActionTypes.DELETE_RECEIPT),
    map((action: receiptsActions.DeleteReceipt) => action.payload),
    switchMap((id: number) =>
      this.receiptResource.deleteReceipt(id).pipe(
        map(() => new receiptsActions.DeleteReceiptSuccess(id)),
        tap(() => this.router.navigate(['/Receipt'])),
        catchError((err) => of(new receiptsActions.DeleteReceiptError(err)))
      )
    )
  );

  @Effect()
  uploadImage$: Observable<Action> = this.actions$.pipe(
    ofType(receiptsActions.ActionTypes.UPLOAD_IMAGE),
    switchMap((action: receiptsActions.UploadImage) =>
      this.receiptResource.uploadImageReceipt(action.id, action.image).pipe(
        map(
          (newReceipt: Receipt) =>
            new receiptsActions.UploadImageSuccess({
              id: newReceipt.id,
              changes: newReceipt
            })
        ),
        catchError((err) => of(new receiptsActions.UploadImageError(err)))
      )
    )
  );
  
}