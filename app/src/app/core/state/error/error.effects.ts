import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { AlertService } from '../../services/alert.service';
import * as errorActions from './error.actions';

@Injectable()
export class ErrorEffects {
  constructor(private actions$: Actions, private alertService: AlertService) {}

  @Effect({ dispatch: false })
  handleError$: Observable<Action> = this.actions$.pipe(
    ofType(errorActions.ActionTypes.HandleError),
    map((action: errorActions.HandleError) => action.error),
    tap((error: any) => this.alertService.showError(error.message))
  );
}
