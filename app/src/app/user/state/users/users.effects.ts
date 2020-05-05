import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap, tap } from 'rxjs/operators';

import { UserResource } from 'src/app/core/resources';
import * as usersActions from './users.actions';
import * as sessionActions from '../../../core/state/session/session.actions';

import { User } from 'src/app/shared/models';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userResource: UserResource) {}

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

  // update Credit
  /*     @Effect()
    updateCredit$: Observable<Action> = this.actions$.pipe(
      ofType<usersActions.UpdateCredit>(usersActions.ActionTypes.UPDATE_CREDIT),
      map((action: usersActions.UpdateCredit) => action.payload),
      mergeMap((user: User) =>
        this.userResource.addCredit(user).pipe(
          map(
            (addedCredit: User) =>
              new usersActions.UpdateCreditSuccess({
                id: addedCredit.id,
                changes: addedCredit,
              })
          ),
       //   tap(() => this.router.navigate(["/drink/" + drink.id])),
          catchError((err) => of(new usersActions.UpdateCreditError(err)))
        )
      )
    ); */

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
        /*             tap(() => this.router.navigate(['/event'])),
         */ catchError((err) => of(new usersActions.UpdateCreditError(err)))
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

  // remove Credit
  @Effect()
  removeCredit$: Observable<Action> = this.actions$.pipe(
    ofType<usersActions.removeCredit>(usersActions.ActionTypes.REMOVE_CREDIT),
    map((action: usersActions.removeCredit) => action.payload),
    mergeMap((user: User) =>
      this.userResource.removeCredit(user).pipe(
        map(
          (removeedCredit: User) =>
            new usersActions.UpdateCreditSuccess({
              id: removeedCredit.id,
              changes: removeedCredit,
            })
        ),
        //   tap(() => this.router.navigate(["/drink/" + drink.id])),
        catchError((err) => of(new usersActions.UpdateCreditError(err)))
      )
    )
  );
}
