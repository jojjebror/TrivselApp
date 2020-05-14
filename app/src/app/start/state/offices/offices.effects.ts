import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { HomeResource } from '../../../core/resources';
import * as officesActions from './offices.actions';
import { Office } from 'src/app/shared/models';

@Injectable()
export class OfficesEffects {
  constructor(private actions$: Actions, private homeResource: HomeResource, private router: Router) {}

  @Effect()
  loadOffices$: Observable<Action> = this.actions$.pipe(
    ofType(officesActions.ActionTypesO.LOAD_OFFICES),
    switchMap(() => {
      return this.homeResource.loadOffices().pipe(
        map((offices: Office[]) => new officesActions.LoadOfficesSuccess(offices)),
        catchError((err) => of(new officesActions.LoadOfficesError(err)))
      );
    })
  );
}

//{type: '@ngrx/store/update-reducers', feature: 'feature1'}