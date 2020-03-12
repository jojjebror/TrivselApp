import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { EventResource } from '../../../core/resources';

import * as eventsActions from './events.actions';

@Injectable()
export class EventsEffects {
  constructor(private actions$: Actions, private eventResource: EventResource) {}

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.Load),
    switchMap(() => this.eventResource.loadEvents().pipe(map(evs => new eventsActions.LoadSuccess(evs))))
  );

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType(eventsActions.ActionTypes.Create),
    map((action: eventsActions.Create) => action.ev),
    switchMap(ev => this.eventResource.create(ev).pipe(map(createdEvent => new eventsActions.CreateSuccess(createdEvent))))
  );
}
