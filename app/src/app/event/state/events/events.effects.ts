import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';

import { EventResource } from '../../../core/resources';

import * as eventsActions from './events.actions';
import { Event } from 'src/app/shared/models';

@Injectable()
export class EventsEffects {
  constructor(private actions$: Actions, private eventResource: EventResource) {}

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.Load),
    switchMap(() => this.eventResource.loadEvents().pipe(map(evs => new eventsActions.LoadSuccess(evs))))
  );

  /* @Effect()
  loadEv$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.Load),
    switchMap(() => this.eventResource.loadEvent(id).pipe(map(ev => new eventsActions.LoadSuccess(ev))))
  ); */

  @Effect()
  loadEv$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.Load),
    mergeMap((action: eventsActions.LoadEv) =>
      this.eventResource.loadEvent(action.payload).pipe(
        map((event: Event) => new eventsActions.LoadEvSuccess(event)),
        catchError(err => of(new eventsActions.LoadEvError(err)))
      )
    )
  );

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.Create),
    map((action: eventsActions.Create) => action.ev),
    switchMap(ev => this.eventResource.create(ev).pipe(map(createdEvent => new eventsActions.CreateSuccess(createdEvent))))
  );
}
