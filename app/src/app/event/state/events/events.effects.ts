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
        map((event: Event) => new eventsActions.LoadEventSuccess(event)),
        tap(() => this.router.navigate(['/event/' + action.payload])),
        catchError(err => of(new eventsActions.LoadEventError(err)))
      )
    )
  );

  /* @Effect()
  createEvent$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.CREATE_EVENT),
    map((action: eventsActions.CreateEvent) => action.payload),
    switchMap((event: Event) =>
      this.eventResource.createEvent(event).pipe(
        map((newEvent: Event) => new eventsActions.CreateEventSuccess(newEvent)),
        tap(() => this.router.navigate(['/event'])),
        catchError(err => of(new eventsActions.CreateEventError(err)))
      )
    )
  ); */

  @Effect()
  createEvent$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.CREATE_EVENT),
    switchMap((action: eventsActions.CreateEvent) =>
      this.eventResource.createEvent(action.payload).pipe(
        switchMap((newEvent: Event) => [new eventsActions.CreateEventSuccess(newEvent), 
          new eventsActions.UploadImage(newEvent.id, action.image)]),
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
  addUserEvent$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.ADD_USER_EVENT),
    map((action: eventsActions.AddUserEvent) => action.payload),
    switchMap((data: number[]) =>
      this.eventResource.acceptInvite(data).pipe(
        map(() => new eventsActions.AddUserEventSuccess(data)),
        catchError(err => of(new eventsActions.AddUserEventError(err)))
      )
    )
  );

  /*  @Effect()
  uploadImage$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.UPLOAD_IMAGE),
    map((action: eventsActions.UploadImage) => action.payload),
    switchMap((image: File) =>
      this.eventResource.uploadImage(image).pipe(
        map((data: boolean) => new eventsActions.UploadImageSuccess(data)),
        catchError(err => of(new eventsActions.UploadImageError(err)))
      )
    )
  ); */

  @Effect()
  uploadImage$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.UPLOAD_IMAGE),
    switchMap((action: eventsActions.UploadImage) =>
      this.eventResource.uploadImage(action.id, action.payload).pipe(
        map((data: boolean) => new eventsActions.UploadImageSuccess(data)),
        catchError(err => of(new eventsActions.UploadImageError(err)))
      )
    )
  );
}
