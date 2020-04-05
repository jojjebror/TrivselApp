import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';

import { UserResource } from 'src/app/core/resources';

import * as usersActions from './users.actions';
import { User } from 'src/app/shared/models';


@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userResource: UserResource) {}

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

   @Effect()
  loadUser$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.ActionTypes.GET_USER),
    switchMap((actions: usersActions.GetCurrentUser) =>
      this.userResource.getCurrentUser(actions.payload).pipe(
        map((user: User) => new usersActions.GetCurrentUserSuccess(user)),
        catchError((err) => of(new usersActions.GetCurrentUserError(err)))
      )
    )
  ); 
}
