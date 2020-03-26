import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { UserResource } from 'src/app/core/resources';

import * as usersActions from './users.actions';
import { User } from 'src/app/shared/models';


@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userResource: UserResource) {}

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType<usersActions.GetUsers>(usersActions.ActionTypes.GET_USERS),
    mergeMap((actions: usersActions.GetUsers) =>
      this.userResource.getUsers().pipe(
        map((users: User[]) => new usersActions.GetUsersSuccess(users)),
        catchError(err => of(new usersActions.GetUsersError(err)))
      )
    )
  );
}

/*   @Effect()
  loadEvents$: Observable<Action> = this.actions$.pipe(
    ofType<eventsActions.LoadEvents>(eventsActions.ActionTypes.LOAD_EVENTS),
    mergeMap((actions: eventsActions.LoadEvents) =>
      this.eventResource.loadEvents().pipe(
        map((events: Event[]) => new eventsActions.LoadEventsSuccess(events)),
        catchError(err => of(new eventsActions.LoadEventsError(err)))
      )
    )
  ); */