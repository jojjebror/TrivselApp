import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap, exhaustMap } from 'rxjs/operators';

import { EventResource } from '../../../core/resources';

import * as eventsActions from './events.actions';
import { Event } from 'src/app/shared/models';
import { Router } from '@angular/router';

@Injectable()
export class EventsEffects {
  constructor(private actions$: Actions, private eventResource: EventResource, private router: Router) {}

  @Effect()
  loadEvents$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.LOAD_EVENTS),
    switchMap((actions: eventsActions.LoadEvents) =>
      this.eventResource.loadEvents().pipe(
        map((events: Event[]) => new eventsActions.LoadEventsSuccess(events)),
        catchError(err => of(new eventsActions.LoadEventsError(err)))
      )
    )
  );

  @Effect()
  loadEvent$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.LOAD_EVENT),
    switchMap((action: eventsActions.LoadEvent) =>
      this.eventResource.loadEvent(action.payload).pipe(
        switchMap((event: Event) => 
        [
          new eventsActions.LoadEventSuccess(event), 
          //new eventsActions.LoadImage(event.id)
        ]),
        tap(() => this.router.navigate(['/event/' + action.payload])),
        catchError(err => of(new eventsActions.LoadEventError(err)))
      )
    )
  );

  @Effect()
  createEvent$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.CREATE_EVENT),
    switchMap((action: eventsActions.CreateEvent) =>
      this.eventResource.createEvent(action.payload).pipe(
        switchMap((newEvent: Event) => [
          new eventsActions.CreateEventSuccess(newEvent),
          new eventsActions.SaveImage(newEvent.id, action.image)
        ]),
        tap(() => this.router.navigate(['/event'])),
        catchError(err => of(new eventsActions.CreateEventError(err)))
      )
    )
  );

  @Effect()
  updateEvent$: Observable<Action> = this.actions$.pipe(
    ofType<eventsActions.UpdateEvent>(eventsActions.ActionTypes.UPDATE_EVENT),
    map((action: eventsActions.UpdateEvent) => action.payload),
    switchMap((event: Event) =>
      this.eventResource.updateEvent(event).pipe(
        map(
          (updatedEvent: Event) =>
            new eventsActions.UpdateEventSuccess({
              id: updatedEvent.id,
              changes: updatedEvent
            })
        ),
        tap(() => this.router.navigate(['/event/' + event.id])),
        catchError(err => of(new eventsActions.UpdateEventError(err)))
      )
    )
  );

  @Effect()
  deleteEvent$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.DELETE_EVENT),
    map((action: eventsActions.DeleteEvent) => action.payload),
    switchMap((id: number) =>
      this.eventResource.deleteEvent(id).pipe(
        map(() => new eventsActions.DeleteEventSuccess(id)),
        tap(() => this.router.navigate(['/event'])),
        catchError(err => of(new eventsActions.DeleteEventError(err)))
      )
    )
  );

  @Effect()
  addOrUpdateEventParticipant$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.ADD_EVENT_PARTICIPANT),
    switchMap((action: eventsActions.AddEventParticipant) =>
      this.eventResource.addOrUpdateEventParticipant(action.payload).pipe(
        switchMap((updatedEvent: Event) => [
          new eventsActions.AddEventParticipantSuccess({
            id: updatedEvent.id,
            changes: updatedEvent
          }),
          new eventsActions.LoadEvent(updatedEvent.id)
        ]),
        catchError(err => of(new eventsActions.AddEventParticipantError(err)))
      )
    )
  );

  @Effect()
  saveImage$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.SAVE_IMAGE),
    switchMap((action: eventsActions.SaveImage) =>
      this.eventResource.saveImage(action.id, action.payload).pipe(
        map((data: boolean) => new eventsActions.SaveImageSuccess(data)),
        catchError(err => of(new eventsActions.SaveImageError(err)))
      )
    )
  );

  @Effect()
  loadImage$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.LOAD_IMAGE),
    switchMap((action: eventsActions.LoadImage) =>
      this.eventResource.loadImage(action.payload).pipe(
        map((imageUrl: string) => new eventsActions.LoadImageSuccess(imageUrl)),
        catchError(err => of(new eventsActions.LoadImageError(err)))
      )
    )
  );
}