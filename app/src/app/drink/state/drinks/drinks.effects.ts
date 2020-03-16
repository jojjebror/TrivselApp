import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';



import * as drinksActions from './drinks.actions';
import { DrinkResource } from 'src/app/core/resources/drink.resource';
import { ApiResource } from 'src/app/core/resources/api.resource';


@Injectable()
export class DrinksEffects {
  constructor(private actions$: Actions, private drinkResource: DrinkResource, private apiResource: ApiResource) {}

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType(drinksActions.ActionTypes.Load),
    switchMap(() => this.drinkResource.loadDrinks().pipe(map(drs => new drinksActions.LoadSuccess(drs))))
  );

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType(drinksActions.ActionTypes.Create),
    map((action: drinksActions.Create) => action.dr),
    switchMap(dr => this.drinkResource.create(dr).pipe(map(createdDrink => new drinksActions.CreateSuccess(createdDrink))))
  );

  @Effect()
  delete$: Observable<Action> = this.actions$.pipe(
    ofType<drinksActions.Delete>(
      drinksActions.ActionTypes.Delete
    ),
    map((action: drinksActions.Delete) => action.dr),
    mergeMap((id:number) =>
    this.apiResource.deleteDrink(id).pipe(
      map(() => new drinksActions.DeleteSuccess(id)),
      catchError(err=> of(new drinksActions.DeleteError(err)))
      )
    )
  );
}
