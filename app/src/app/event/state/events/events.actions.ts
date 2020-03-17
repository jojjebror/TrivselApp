import { Action } from '@ngrx/store';

import { Event } from '../../../shared/models';
import { Update } from '@ngrx/entity';

export enum ActionTypes {
  LOAD_EVENTS = '[Events view] Load Events',
  LOAD_EVENTS_SUCCESS = '[API: /event] Load Events success',
  LOAD_EVENTS_ERROR = '[API: /event] Load Events error',

  LOAD_EVENT = '[Events view] Load Event',
  LOAD_EVENT_SUCCESS = '[API: /event] Load Event success',
  LOAD_EVENT_ERROR = '[API: /event] Load Event error',

  CREATE_EVENT = '[Events view] Create Event',
  CREATE_EVENT_SUCCESS = '[API: /event] Create Event success',
  CREATE_EVENT_ERROR = '[API: /event] Create Event error',

  UPDATE_EVENT = '[Events view] Update Event',
  UPDATE_EVENT_SUCCESS = '[API: /event] Update Event success',
  UPDATE_EVENT_ERROR = '[API: /event] Update Event error',

  DELETE_EVENT = '[Events view] Delete Event',
  DELETE_EVENT_SUCCESS = '[API: /event] Delete Event success',
  DELETE_EVENT_ERROR = '[API: /event] Delete Event error'
}

/*--------------LoadAllEvents--------------*/

export class LoadEvents implements Action {
  readonly type = ActionTypes.LOAD_EVENTS;
}

export class LoadEventsSuccess implements Action {
  readonly type = ActionTypes.LOAD_EVENTS_SUCCESS;

  constructor(public payload: Event[]) {}
}

export class LoadEventsError implements Action {
  readonly type = ActionTypes.LOAD_EVENTS_ERROR;

  constructor(public payload: string) {}
}

/*--------------LoadEvent--------------*/

export class LoadEvent implements Action {
  readonly type = ActionTypes.LOAD_EVENT;

  constructor(public payload: number) {}
}

export class LoadEventSuccess implements Action {
  readonly type = ActionTypes.LOAD_EVENT_SUCCESS;

  constructor(public payload: Event) {}
}

export class LoadEventError implements Action {
  readonly type = ActionTypes.LOAD_EVENT_ERROR;

  constructor(public payload: string) {}
}

/*--------------CreateEvent--------------*/

 export class CreateEvent implements Action {
  readonly type = ActionTypes.CREATE_EVENT;

  constructor(public payload: Event) {
  }
} 

export class CreateEventSuccess implements Action {
  readonly type = ActionTypes.CREATE_EVENT_SUCCESS;

  constructor(public payload: Event) {}
}

export class CreateEventError implements Action {
  readonly type = ActionTypes.CREATE_EVENT_ERROR;

  constructor(public payload: string) {}
}

/*--------------UpdateEvent--------------*/

export class UpdateEvent implements Action {
  readonly type = ActionTypes.UPDATE_EVENT;

  constructor(public payload: Event) {}
}

export class UpdateEventSuccess implements Action {
  readonly type = ActionTypes.UPDATE_EVENT_SUCCESS;

  constructor(public payload: Update<Event>) {}
}

export class UpdateEventError implements Action {
  readonly type = ActionTypes.UPDATE_EVENT_ERROR;

  constructor(public payload: string) {}
}

/*--------------RemoveEvent--------------*/

export class DeleteEvent implements Action {
  readonly type = ActionTypes.DELETE_EVENT;

  constructor(public payload: number) {}
}

export class DeleteEventSuccess implements Action {
  readonly type = ActionTypes.DELETE_EVENT_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteEventError implements Action {
  readonly type = ActionTypes.DELETE_EVENT_ERROR;

  constructor(public payload: string) {}
}

export type Actions =
  | LoadEvents
  | LoadEventsSuccess
  | LoadEventsError
  | LoadEvent
  | LoadEventSuccess
  | LoadEventError
  | CreateEvent
  | CreateEventSuccess
  | CreateEventError
  | UpdateEvent
  | UpdateEventSuccess
  | UpdateEventError
  | DeleteEvent
  | DeleteEventSuccess
  | DeleteEventError;
