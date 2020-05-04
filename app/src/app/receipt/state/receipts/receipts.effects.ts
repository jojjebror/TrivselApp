import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { switchMap, map, mergeMap, catchError, tap } from "rxjs/operators";

import { Router } from "@angular/router";

import * as receiptsActions from "./receipts.actions";
import { DrinkResource } from "src/app/core/resources/drink.resource";
import { Receipt } from "src/app/shared/models";


@Injectable()
export class ReceiptsEffects {
  constructor(
    private actions$: Actions,
    private drinkResource: DrinkResource,
    private router: Router
  ) {}
  

  @Effect()
  loadReceipts$: Observable<Action> = this.actions$.pipe(
      ofType(receiptsActions.ActionTypes.LOAD_RECEIPTS),
      mergeMap((actions: receiptsActions.LoadReceipts) => 
        this.drinkResource.loadReceipts().pipe(
            map((receipts: Receipt[]) => new receiptsActions.LoadReceiptsSuccess(receipts)),
            catchError((err) => of(new receiptsActions.LoadReceiptsError(err)))
        )
    )
  );

  @Effect()
  createReceipt$:Observable<Action> = this.actions$.pipe(
      ofType(receiptsActions.ActionTypes.CREATE_RECEIPT),
      switchMap((action: receiptsActions.CreateReceipt) =>
        this.drinkResource.createReceipt(action.payload).pipe(
            switchMap((newReceipt: Receipt) =>
            [
                new receiptsActions.SaveImage(newReceipt.id, action.image),
                new receiptsActions.CreateReceiptSuccess(newReceipt)
            ]),
            tap(() => this.router.navigate(['/receipt'])),
            catchError((err) => of(new receiptsActions.CreateReceiptError(err)))
        )
    )
  );

  @Effect()
  saveImage$: Observable<Action> = this.actions$.pipe(
    ofType(receiptsActions.ActionTypes.SAVE_IMAGE),
    switchMap((action: receiptsActions.SaveImage) =>
      this.drinkResource.saveImageReceipt(action.id, action.payload).pipe(
        map(
          (newReceipt: Receipt) =>
            new receiptsActions.SaveImageSuccess({
              id: newReceipt.id,
              changes: newReceipt
            })
        ),
        catchError((err) => of(new receiptsActions.SaveImageError(err)))
      )
    )
  );
  
}