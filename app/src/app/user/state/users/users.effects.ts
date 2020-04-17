import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap, tap } from 'rxjs/operators';

import { UserResource } from 'src/app/core/resources';
import * as usersActions from './users.actions';

import { User } from 'src/app/shared/models';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userResource: UserResource,
  ) {}

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.ActionTypes.GET_USERS),
    switchMap((actions: usersActions.GetUsers) =>
      this.userResource.getUsers().pipe(
        map((users: User[]) => new usersActions.GetUsersSuccess(users)),
        catchError((err) => of(new usersActions.GetUsersError(err)))
      )
    )
  );
 
    // update Credit
    @Effect()
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
