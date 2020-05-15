import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { HomeResource } from '../../../core/resources';
import * as officesActions from './offices.actions';
import { Office } from 'src/app/shared/models';

@Injectable()
export class OfficesEffects {
  constructor(private actions$: Actions, private homeResource: HomeResource, private router: Router) {}

  @Effect()
  loadOffices$: Observable<Action> = this.actions$.pipe(
    ofType(officesActions.ActionTypes.LOAD_OFFICES),
    switchMap(() => {
      return this.homeResource.loadOffices().pipe(
        map((offices: Office[]) => new officesActions.LoadOfficesSuccess(offices)),
        catchError((err) => of(new officesActions.LoadOfficesError(err)))
      );
    })
  );

  @Effect()
  updateOffice$: Observable<Action> = this.actions$.pipe(
    ofType(officesActions.ActionTypes.UPDATE_OFFICE),
    switchMap((action: officesActions.UpdateOffice) =>
      this.homeResource.updateOffice(action.payload).pipe(
        map((updatedOffice: Office) => {
          return new officesActions.UpdateOfficeSuccess({
            id: updatedOffice.id,
            changes: updatedOffice,
          });
        }),
        catchError((err) => of(new officesActions.UpdateOfficeError(err)))
      )
    )
  );

  @Effect()
  createOffice$: Observable<Action> = this.actions$.pipe(
    ofType(officesActions.ActionTypes.CREATE_OFFICE),
    switchMap((action: officesActions.CreateOffice) =>
      this.homeResource.createOffice(action.payload).pipe(
        map((newOffice: Office) => {
          return new officesActions.CreateOfficeSuccess(newOffice);
        }),
        catchError((err) => of(new officesActions.CreateOfficeError(err)))
      )
    )
  );
}

