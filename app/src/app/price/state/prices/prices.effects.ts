import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { switchMap, map, mergeMap, catchError, tap } from "rxjs/operators";

import { Router } from "@angular/router";

import * as pricesActions from "./prices.actions";
import { DrinkResource } from "src/app/core/resources/drink.resource";
import { Price } from "src/app/shared/models";
import { text } from "@angular/core/src/render3";


@Injectable()
export class PricesEffects {
  constructor(
    private actions$: Actions,
    private drinkResource: DrinkResource,
    private router: Router
  ) {}

  @Effect()
  loadPrices$: Observable<Action> = this.actions$.pipe(
    ofType<pricesActions.LoadPrices>(pricesActions.ActionTypes.LOAD_PRICES),
   map((action: pricesActions.LoadPrices) => action.payload),
    mergeMap((price: string) => 
     this.drinkResource.loadPrices(price).pipe(
       map(
         (prices: Price[]) =>
           new pricesActions.LoadPricesSuccess(prices)
       ),
       catchError((err) => of(new pricesActions.LoadPricesError(err)))
       )
     )
   );
}
