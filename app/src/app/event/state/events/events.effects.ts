import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { EventResource } from '../../../core/resources';

import * as eventsActions from './events.actions';
import { Event } from 'src/app/shared/models';

@Injectable()
export class EventsEffects {
  constructor(private actions$: Actions, private eventResource: EventResource) {}

  @Effect()
  loadEvents$: Observable<Action> = this.actions$.pipe(
    ofType<eventsActions.LoadEvents>(eventsActions.ActionTypes.LOAD_EVENTS),
    mergeMap((actions: eventsActions.LoadEvents) =>
      this.eventResource.loadEvents().pipe(
        map((events: Event[]) => new eventsActions.LoadEventsSuccess(events)),
        catchError(err => of(new eventsActions.LoadEventsError(err)))
      )
    )
  );

  @Effect()
  loadEvent$: Observable<Action> = this.actions$.pipe(
    ofType<eventsActions.LoadEvent>(eventsActions.ActionTypes.LOAD_EVENT),
    mergeMap((action: eventsActions.LoadEvent) =>
      this.eventResource.loadEvent(action.payload).pipe(
        map((event: Event) => new eventsActions.LoadEventSuccess(event)),
        catchError(err => of(new eventsActions.LoadEventError(err)))
      )
    )
  );

  @Effect()
  createEvent$: Observable<Action> = this.actions$.pipe(
    ofType<eventsActions.CreateEvent>(eventsActions.ActionTypes.CREATE_EVENT),
    map((action: eventsActions.CreateEvent) => action.payload),
    mergeMap((event: Event) =>
      this.eventResource.createEvent(event).pipe(
        map((newEvent: Event) => new eventsActions.CreateEventSuccess(newEvent)),
        catchError(err => of(new eventsActions.CreateEventError(err)))
      )
    )
  );

  @Effect()
  updateEvent$: Observable<Action> = this.actions$.pipe(
    ofType<eventsActions.UpdateEvent>(eventsActions.ActionTypes.UPDATE_EVENT),
    map((action: eventsActions.UpdateEvent) => action.payload),
    mergeMap((event: Event) =>
      this.eventResource.updateEvent(event).pipe(
        map(
          (updatedEvent: Event) =>
            new eventsActions.UpdateEventSuccess({
              id: updatedEvent.id,
              changes: updatedEvent
            })
        ),
        catchError(err => of(new eventsActions.UpdateEventError(err)))
      )
    )
  );

  @Effect()
  deleteEvent$: Observable<Action> = this.actions$.pipe(
    ofType<eventsActions.DeleteEvent>(eventsActions.ActionTypes.DELETE_EVENT),
    map((action: eventsActions.DeleteEvent) => action.payload),
    mergeMap((id: number) =>
      this.eventResource.deleteEvent(id).pipe(
        map(() => new eventsActions.DeleteEventSuccess(id)),
        catchError(err => of(new eventsActions.DeleteEventError(err)))
      )
    )
  );
}
