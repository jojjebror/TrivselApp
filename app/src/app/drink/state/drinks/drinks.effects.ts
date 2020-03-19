import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';



import * as drinksActions from './drinks.actions';
import { DrinkResource } from 'src/app/core/resources/drink.resource';
import { Drink } from 'src/app/shared/models';


@Injectable()
export class DrinksEffects {
  constructor(private actions$: Actions, private drinkResource: DrinkResource) {}

  @Effect()
  loadDrinks$: Observable<Action> = this.actions$.pipe(
    ofType<drinksActions.LoadDrinks>(drinksActions.ActionTypes.LOAD_DRINKS),
    mergeMap((actions: drinksActions.LoadDrinks) =>
    this.drinkResource.loadDrinks().pipe(
      map((drinks: Drink[]) => new drinksActions.LoadDrinksSuccess(drinks)),
      catchError(err => of(new drinksActions.LoadDrinkError(err)))
      )
    )
  );

  @Effect()
  loadDrink$: Observable<Action> = this.actions$.pipe(
    ofType<drinksActions.LoadDrink>(drinksActions.ActionTypes.LOAD_DRINK),
    mergeMap((action: drinksActions.LoadDrink) =>
      this.drinkResource.loadDrink(action.payload).pipe(
        map((drink: Drink) => new drinksActions.LoadDrinkSuccess(drink)),
        catchError(err => of(new drinksActions.LoadDrinkError(err)))
      )
    )
  );


@Effect()
  createDrinks$: Observable<Action> = this.actions$.pipe(
    ofType<drinksActions.CreateDrink>(drinksActions.ActionTypes.CREATE_DRINK),
    map((action: drinksActions.CreateDrink) => action.payload),
    mergeMap((drink: Drink) =>
      this.drinkResource.create(drink).pipe(
        map((newDrink: Drink) => new drinksActions.CreateDrinkSuccess(newDrink)),
        catchError(err => of(new drinksActions.CreateDrinkError(err)))
      )
    )
  );

  @Effect()
  createDrink$: Observable<Action> = this.actions$.pipe(
    ofType<drinksActions.CreateDrink>(drinksActions.ActionTypes.CREATE_DRINK),
    map((action: drinksActions.CreateDrink) => action.payload),
    mergeMap((drink: Drink) =>
      this.drinkResource.create(drink).pipe(
        map((newDrink: Drink) => new drinksActions.CreateDrinkSuccess(newDrink)),
        catchError(err => of(new drinksActions.CreateDrinkError(err)))
      )
    )
  );

  /*

  @Effect()
  deleteDrink$ : Observable<Action> = this.actions$.pipe(
    ofType<drinksActions.DeleteDrink>(
      drinksActions.ActionTypes.DELETE_DRINK
    ),
    map((action: drinksActions.DeleteDrink) => action.payload),
    mergeMap((id: number) =>
      this.drinkResource.deleteDrink(id).pipe(
        map(() => new drinksActions.DeleteDrinkSuccess(id)),
        catchError(err => of(new drinksActions.DeleteDrinkError(err)))
      )
    )
  );
  */

}
