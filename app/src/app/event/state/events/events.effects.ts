import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import { EventResource } from '../../../core/resources';

import * as eventsActions from './events.actions';
import * as fromError from '../../../core/state/error';

import { Event, Post } from 'src/app/shared/models';
import { Router } from '@angular/router';

@Injectable()
export class EventsEffects {
  constructor(
    private actions$: Actions,
    private eventResource: EventResource,
    private router: Router
  ) {}

  @Effect()
  loadEvents$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.LOAD_EVENTS),
    switchMap(() => {
      return this.eventResource.loadEvents().pipe(
        map((events: Event[]) => new eventsActions.LoadEventsSuccess(events)),
        catchError((err) => of(new eventsActions.LoadEventsError(err)))
      );
    })
  );

  @Effect()
  loadEvent$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.LOAD_EVENT),
    switchMap((action: eventsActions.LoadEvent) =>
      this.eventResource.loadEvent(action.payload).pipe(
        switchMap((event: Event) => [new eventsActions.LoadEventSuccess(event)]),
        catchError((err) => of(new eventsActions.LoadEventError(err)))
      )
    )
  );

  @Effect()
  createEvent$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.CREATE_EVENT),
    switchMap((action: eventsActions.CreateEvent) =>
      this.eventResource.createEvent(action.payload).pipe(
        switchMap((newEvent: Event) => [
          new eventsActions.SaveImage(newEvent.id, action.image),
          new eventsActions.CreateEventSuccess(newEvent)
        ]),
        tap(() => this.router.navigate(['/event'])),
        catchError((err) => of(new eventsActions.CreateEventError(err)))
      )
    )
  );

  @Effect()
  loadEditEvent$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.LOAD_EDIT_EVENT),
    switchMap((action: eventsActions.LoadEditEvent) =>
      this.eventResource.loadEvent(action.payload).pipe(
        switchMap((event: Event) => [new eventsActions.LoadEditEventSuccess(event)]),
        tap(() => this.router.navigate(['/event/edit/' + action.payload])),
        catchError((err) => of(new eventsActions.LoadEditEventError(err)))
      )
    )
  );

  @Effect()
  updateEvent$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.UPDATE_EVENT),
    switchMap((action: eventsActions.UpdateEvent) =>
      this.eventResource.updateEvent(action.payload).pipe(
        switchMap((updatedEvent: Event) => [
          new eventsActions.UpdateEventSuccess({
            id: updatedEvent.id,
            changes: updatedEvent
          }),
          new eventsActions.SaveImage(updatedEvent.id, action.image),
        ]),
        tap(() => this.router.navigate(['/event/' + action.payload.id])),
        catchError((err) => of(new eventsActions.UpdateEventError(err)))
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
        catchError((err) => of(new eventsActions.DeleteEventError(err)))
      )
    )
  );

  @Effect()
  addEventParticipant$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.ADD_EVENT_PARTICIPANT),
    switchMap((action: eventsActions.AddEventParticipant) =>
      this.eventResource.addEventParticipantStatus(action.payload).pipe(
        switchMap((updatedEvent: Event) => [
          new eventsActions.AddEventParticipantSuccess({
            id: updatedEvent.id,
            changes: updatedEvent,
          }),
          new eventsActions.LoadEvent(updatedEvent.id),
        ]),
        catchError((err) => of(new eventsActions.AddEventParticipantError(err)))
      )
    )
  );

  @Effect()
  saveImage$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.SAVE_IMAGE),
    switchMap((action: eventsActions.SaveImage) =>
      this.eventResource.saveImage(action.id, action.payload).pipe(
        map(
          (newEvent: Event) =>
            new eventsActions.SaveImageSuccess({
              id: newEvent.id,
              changes: newEvent
            })
        ),
        catchError((err) => of(new eventsActions.SaveImageError(err)))
      )
    )
  );

  @Effect()
  loadUserEvents$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.GET_USER_EVENT),
    switchMap((actions: eventsActions.GetCurrentUserEvent) =>
      this.eventResource.loadUsersEvents(actions.payload).pipe(
        map((event: Event[]) => new eventsActions.GetCurrentUserEventSuccess(event)),
        catchError((err) => of(new eventsActions.GetCurrentUserEventError(err)))
      )
    )
  );

  @Effect()
  updateParticipantStatus$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.UPDATE_USER_PARTICIPANT),
    switchMap((action: eventsActions.UpdateUserParticipant) =>
      this.eventResource.updateParticipantStatus(action.payload).pipe(
        switchMap((updatedEvent: Event) => [
          new eventsActions.UpdateUserParticipantSuccess({
            id: updatedEvent.id,
            changes: updatedEvent,
          }),
          new eventsActions.GetCurrentUserEvent(action.payload[1]),
        ]),
        tap(() => this.router.navigate(['/event'])),
        catchError((err) => of(new eventsActions.UpdateUserParticipantError(err)))
      )
    )
  );

  @Effect()
  addPostToEvent$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.ADD_POST_EVENT),
    switchMap((action: eventsActions.AddPostToEvent) =>
      this.eventResource.createPost(action.payload).pipe(
        switchMap((post: Post) => [
          new eventsActions.AddPostToEventSuccess({
            id: post.id,
            changes: post,
          }),
          new eventsActions.LoadEvent(post.eventId),
        ]),
        catchError((err) => of(new eventsActions.AddPostToEventError(err)))
      )
    )
  );

  @Effect()
  deletePost$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.REMOVE_POST_EVENT),
    map((action: eventsActions.DeletePost) => action.payload),
    switchMap((post: number[]) =>
      this.eventResource.deletePost(post).pipe(
        map(() => new eventsActions.DeletePostSuccess(post[0])),
        map(() => new eventsActions.LoadEvent(post[1])),
        catchError((err) => of(new eventsActions.DeletePostError(err)))
      )
    )
  );
}
