import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { switchMap, map, mergeMap, catchError, tap } from "rxjs/operators";

import { Router } from "@angular/router";

import * as drinksActions from "./drinks.actions";
import { DrinkResource } from "src/app/core/resources/drink.resource";
import { Drink } from "src/app/shared/models";
import { text } from "@angular/core/src/render3";


@Injectable()
export class DrinksEffects {
  constructor(
    private actions$: Actions,
    private drinkResource: DrinkResource,
    private router: Router
  ) {}
  
  
  @Effect()
  saveImage$: Observable<Action> = this.actions$.pipe(
    ofType(drinksActions.ActionTypes.SAVE_IMAGE),
    switchMap((action: drinksActions.SaveImage) =>
      this.drinkResource.saveImage(action.id, action.payload).pipe(
        map(
          (newDrink: Drink) =>
            new drinksActions.SaveImageSuccess({
              id: newDrink.id,
              changes: newDrink
            })
        ),
        catchError((err) => of(new drinksActions.SaveImageError(err)))
      )
    )
  );
  
  //load drinks
  @Effect()
  loadDrinks$: Observable<Action> = this.actions$.pipe(
    ofType<drinksActions.LoadDrinks>(drinksActions.ActionTypes.LOAD_DRINKS),
    mergeMap((actions: drinksActions.LoadDrinks) =>
      this.drinkResource.loadDrinks().pipe(
        map((drinks: Drink[]) => new drinksActions.LoadDrinksSuccess(drinks)),
        catchError((err) => of(new drinksActions.LoadDrinkError(err)))
      )
    )
  );

  //load drink
  @Effect()
  loadDrink$: Observable<Action> = this.actions$.pipe(
    ofType<drinksActions.LoadDrink>(drinksActions.ActionTypes.LOAD_DRINK),
    mergeMap((action: drinksActions.LoadDrink) =>
      this.drinkResource.loadDrink(action.payload).pipe(
        map((drink: Drink) => new drinksActions.LoadDrinkSuccess(drink)),
        catchError((err) => of(new drinksActions.LoadDrinkError(err)))
      )
    )
  );

  // create new drink
  @Effect()
  createDrink$: Observable<Action> = this.actions$.pipe(
    ofType(drinksActions.ActionTypes.CREATE_DRINK),
    switchMap((action: drinksActions.CreateDrink) =>
      this.drinkResource.create(action.payload).pipe(
        switchMap((newDrink: Drink) =>
        [
          new drinksActions.SaveImage(newDrink.id, action.image),
          new drinksActions.CreateDrinkSuccess(newDrink)
        ]),
        tap(() => this.router.navigate(["/drink"])),
        catchError((err) => of(new drinksActions.CreateDrinkError(err)))
      )
    )
  );

  // delete drink
  @Effect()
  deleteDrink$: Observable<Action> = this.actions$.pipe(
    ofType<drinksActions.DeleteDrink>(drinksActions.ActionTypes.DELETE_DRINK),
    map((action: drinksActions.DeleteDrink) => action.payload),
    mergeMap((id: number) =>
      this.drinkResource.deleteDrink(id).pipe(
        map(() => new drinksActions.DeleteDrinkSuccess(id)),
        tap(() => this.router.navigate(["/drink"])),
        catchError((err) => of(new drinksActions.DeleteDrinkError(err)))
      )
    )
  );
  // update Drink
  @Effect()
  updateDrink$: Observable<Action> = this.actions$.pipe(
    ofType<drinksActions.UpdateDrink>(drinksActions.ActionTypes.UPDATE_DRINK),
    map((action: drinksActions.UpdateDrink) => action.payload),
    mergeMap((drink: Drink) =>
      this.drinkResource.updateDrink(drink).pipe(
        map(
          (updatedDrink: Drink) =>
            new drinksActions.UpdateDrinkSuccess({
              id: updatedDrink.id,
              changes: updatedDrink,
            })
        ),
        tap(() => this.router.navigate(["/drink/" + drink.id])),
        catchError((err) => of(new drinksActions.UpdateDrinkError(err)))
      )
    )
  );

  @Effect()
  filterDrink$: Observable<Action> = this.actions$.pipe(
    ofType<drinksActions.FilterDrink>(drinksActions.ActionTypes.FILTER_DRINK),
    map((action: drinksActions.FilterDrink) => action.payload),
    mergeMap((drink: string) =>
      this.drinkResource.filterDrink(drink).pipe(
        map(
          (FilterDrink: Drink[]) =>
            new drinksActions.FilterDrinkSuccess(FilterDrink)
        ),
        catchError((err) => of(new drinksActions.FilterDrinkError(err)))
      )
    )
  );

}
