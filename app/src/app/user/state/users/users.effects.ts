import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap, tap } from 'rxjs/operators';

import { UserResource } from 'src/app/core/resources';
import * as usersActions from './users.actions';
import * as sessionActions from '../../../core/state/session/session.actions';

import { User, Offices } from 'src/app/shared/models';
import { Router } from '@angular/router';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userResource: UserResource,  private router: Router) {}

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.ActionTypes.GET_USERS),
    switchMap(() => {
      return this.userResource.getUsers().pipe(
        map((users: User[]) => new usersActions.GetUsersSuccess(users)),
        catchError((err) => of(new usersActions.GetUsersError(err)))
      );
    })
  );

  @Effect()
  updateCredit$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.ActionTypes.UPDATE_CREDIT),
    switchMap((action: usersActions.UpdateCredit) =>
      this.userResource.addCredit(action.payload).pipe(
        switchMap((updatedCredit: User) => [
          new usersActions.UpdateCreditSuccess({
            id: updatedCredit.id,
            changes: updatedCredit,
          }),
          new sessionActions.SetUser(),
        ]),
        tap(() => this.router.navigate(['/drink/credit'])),
        catchError((err) => of(new usersActions.UpdateCreditError(err)))
      )
    )
  );

  @Effect()
  updateOffice$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.ActionTypes.UPDATE_OFFICE),
    switchMap((action: usersActions.UpdateOffice) =>
      this.userResource.updateOffice(action.payload).pipe(
        switchMap((updatedUser: User) => [
          new usersActions.UpdateOfficeSuccess({
            id: updatedUser.id,
            changes: updatedUser,
          }),
          new sessionActions.SetUser(),
        ]),
          catchError((err) => of(new usersActions.UpdateOfficeError(err)))
      )
    )
  );

  @Effect()
  getOffices$: Observable<Action> = this.actions$.pipe(
    ofType<usersActions.GetOffices>(usersActions.ActionTypes.GET_OFFICES),
    mergeMap((actions: usersActions.GetOffices) =>
      this.userResource.getOffices().pipe(
        map((offices: Offices[]) => new usersActions.GetOfficesSuccess(offices)),
        catchError((err) => of(new usersActions.GetOfficesError(err)))
      )
    )
  );
}
