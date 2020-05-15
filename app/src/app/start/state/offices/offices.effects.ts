import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UserResource } from '../../../core/resources/user.resource';
import { HomeResource } from '../../../core/resources';
import * as officesActions from './offices.actions';
import { Office } from 'src/app/shared/models';

@Injectable()
export class OfficesEffects {
  constructor(private actions$: Actions, private homeResource: HomeResource, private userResourse: UserResource, private router: Router) {}

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

}
