import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import * as layoutActions from '../layout/layout.actions';


@Injectable()
export class SnackbarEffects {
  @Effect({
    dispatch: false,
  })
  closeSnackbar: Observable<any> = this.actions
    .ofType(layoutActions.ActionTypes.SNACKBAR_CLOSE)
    .pipe(tap(() => this.matSnackBar.dismiss()));

  @Effect()
  showSnackbar: Observable<any> = this.actions.ofType<layoutActions.SnackbarOpen>(layoutActions.ActionTypes.SNACKBAR_OPEN).pipe(
    map((action: layoutActions.SnackbarOpen) => action.payload),
    tap((payload) => this.matSnackBar.open(payload.message, payload.action, payload.config)),
    delay(2000),
    map(() => new layoutActions.SnackbarClose())
  );

  constructor(private actions: Actions, private matSnackBar: MatSnackBar) {}
}
