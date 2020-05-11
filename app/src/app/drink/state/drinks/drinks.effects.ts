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
  uploadImage$: Observable<Action> = this.actions$.pipe(
    ofType(drinksActions.ActionTypes.UPLOAD_IMAGE),
    switchMap((action: drinksActions.UploadImage) =>
      this.drinkResource.uploadDrinkImage(action.id, action.image).pipe(
        map(
          (newDrink: Drink) =>
            new drinksActions.UploadImageSuccess({
              id: newDrink.id,
              changes: newDrink
            })
        ),
        catchError((err) => of(new drinksActions.UploadImageError(err)))
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
        map((newDrink: Drink) => {
          if(action.image !== null) {
            return new drinksActions.UploadImage(newDrink.id, action.image);
          }

          new drinksActions.CreateDrinkSuccess(newDrink)
        }),
        tap(() => this.router.navigate(["/drink/category"])),
        catchError((err) => of(new drinksActions.CreateDrinkError(err)))
      )
    )
  );

  // delete drink
  @Effect()
  deleteDrink$: Observable<Action> = this.actions$.pipe(
    ofType(drinksActions.ActionTypes.DELETE_DRINK),
    map((action: drinksActions.DeleteDrink) => action.payload),
    switchMap((id: number) =>
      this.drinkResource.deleteDrink(id).pipe(
        map(() => new drinksActions.DeleteDrinkSuccess(id)),
        tap(() => this.router.navigate(["/drink/category"])),
        catchError((err) => of(new drinksActions.DeleteDrinkError(err)))
      )
    )
  );
  // update Drink
  @Effect()
  updateDrink$: Observable<Action> = this.actions$.pipe(
    ofType(drinksActions.ActionTypes.UPDATE_DRINK),
    switchMap((action: drinksActions.UpdateDrink) =>
      this.drinkResource.updateDrink(action.payload).pipe(
        map((updatedDrink: Drink) => {
          if(action.image !== null) {
            return new drinksActions.UploadImage(updatedDrink.id, action.image);
          }

          return new drinksActions.UpdateDrinkSuccess({
            id: updatedDrink.id,
            changes: updatedDrink,
          });
        }),
        tap(() => this.router.navigate(['/drink/' + action.payload.id])),
        catchError((err) => of( new drinksActions.UpdateDrinkError(err)))
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
