import { Action } from '@ngrx/store';
import { Event, User, Post } from '../../../shared/models';
import { Update } from '@ngrx/entity';

export enum ActionTypes {
  LOAD_EVENTS = '[Events view] Load Events',
  LOAD_EVENTS_SUCCESS = '[API: /event] Load Events success',
  LOAD_EVENTS_ERROR = '[API: /event] Load Events error',

  LOAD_EVENT = '[Events view] Load Event',
  LOAD_EVENT_SUCCESS = '[API: /event] Load Event success',
  LOAD_EVENT_ERROR = '[API: /event] Load Event error',

  LOAD_EDIT_EVENT = '[Events view] Load Edit Event',
  LOAD_EDIT_EVENT_SUCCESS = '[API: /event] Load Edit Event success',
  LOAD_EDIT_EVENT_ERROR = '[API: /event] Load Edit Event error',

  CREATE_EVENT = '[Events view] Create Event',
  CREATE_EVENT_SUCCESS = '[API: /event] Create Event success',
  CREATE_EVENT_ERROR = '[API: /event] Create Event error',

  UPDATE_EVENT = '[Events view] Update Event',
  UPDATE_EVENT_SUCCESS = '[API: /event] Update Event success',
  UPDATE_EVENT_ERROR = '[API: /event] Update Event error',

  DELETE_EVENT = '[Events view] Delete Event',
  DELETE_EVENT_SUCCESS = '[API: /event] Delete Event success',
  DELETE_EVENT_ERROR = '[API: /event] Delete Event error',

  ADD_EVENT_PARTICIPANT = '[Events view] Add Event Participant',
  ADD_EVENT_PARTICIPANT_SUCCESS = '[API: /event] Add Event Participant success',
  ADD_EVENT_PARTICIPANT_ERROR = '[API: /event] Add Event Participant error',

  REMOVE_EVENT_PARTICIPANT = '[Events view] Remove Event Participant',
  REMOVE_EVENT_PARTICIPANT_SUCCESS = '[API: /event] Remove Event Participant success',
  REMOVE_EVENT_PARTICIPANT_ERROR = '[API: /event] Remove Event Participant error',

  SAVE_IMAGE = '[Events view] Save Image',
  SAVE_IMAGE_SUCCESS = '[API: /event] Save Image success',
  SAVE_IMAGE_ERROR = '[API: /event] Save Image error',

  UPDATE_IMAGE = '[Events view] Update Image',
  UPDATE_IMAGE_SUCCESS = '[API: /event] Update Image success',
  UPDATE_IMAGE_ERROR = '[API: /event] Update Image error',

  GET_USER_EVENT = '[Events view] Get User Event',
  GET_USER_EVENT_SUCCESS = '[API: /event] Get User Event Success',
  GET_USER_EVENT_ERROR = '[API: /event] Get User Event Error',

  UPDATE_USER_PARTICIPANT = '[Events view] Add User In Event',
  UPDATE_USER_PARTICIPANT_SUCCESS = '[API: /event] Add User In Event Success',
  UPDATE_USER_PARTICIPANT_ERROR = '[API: /event] Add User In Event Error',

  ADD_POST_EVENT = '[Events view] Add Post In Event',
  ADD_POST_EVENT_SUCCESS = '[API: /post] Add Post In Event Success',
  ADD_POST_EVENT_ERROR = '[API: /post] Add Post In Event Error',

  REMOVE_POST_EVENT = '[Events view] Remove Post In Event',
  REMOVE_POST_EVENT_SUCCESS = '[API: /post] Remove Post In Event Success',
  REMOVE_POST_EVENT_ERROR = '[API: /post] Remove Post In Event Error',
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

/*--------------LoadEvent--------------*/

export class LoadEditEvent implements Action {
  readonly type = ActionTypes.LOAD_EDIT_EVENT;

  constructor(public payload: number) {}
}

export class LoadEditEventSuccess implements Action {
  readonly type = ActionTypes.LOAD_EDIT_EVENT_SUCCESS;

  constructor(public payload: Event) {}
}

export class LoadEditEventError implements Action {
  readonly type = ActionTypes.LOAD_EDIT_EVENT_ERROR;

  constructor(public payload: string) {}
}

/*--------------CreateEvent--------------*/

export class CreateEvent implements Action {
  readonly type = ActionTypes.CREATE_EVENT;

  constructor(public payload: Event, public image: File) {}
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

  constructor(public payload: Event, public image: File) {}
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

/*--------------AddParticipantToEvent--------------*/

export class AddEventParticipant implements Action {
  readonly type = ActionTypes.ADD_EVENT_PARTICIPANT;
  constructor(public payload: any[]) {}
}

export class AddEventParticipantSuccess implements Action {
  readonly type = ActionTypes.ADD_EVENT_PARTICIPANT_SUCCESS;

  constructor(public payload: Update<Event>) {}
}

export class AddEventParticipantError implements Action {
  readonly type = ActionTypes.ADD_EVENT_PARTICIPANT_ERROR;

  constructor(public payload: string) {}
}

/*--------------SaveImage--------------*/

export class SaveImage implements Action {
  readonly type = ActionTypes.SAVE_IMAGE;

  constructor(public id: number, public payload: File) {}
}

export class SaveImageSuccess implements Action {
  readonly type = ActionTypes.SAVE_IMAGE_SUCCESS;

  constructor(public payload: Event) {}
}

export class SaveImageError implements Action {
  readonly type = ActionTypes.SAVE_IMAGE_ERROR;

  constructor(public payload: string) {}
}

/*--------------UpdateImage--------------*/

export class UpdateImage implements Action {
  readonly type = ActionTypes.UPDATE_IMAGE;

  constructor(public id: number, public payload: File) {}
}

export class UpdateImageSuccess implements Action {
  readonly type = ActionTypes.UPDATE_IMAGE_SUCCESS;

  constructor(public payload: boolean) {}
}

export class UpdateImageError implements Action {
  readonly type = ActionTypes.UPDATE_IMAGE_ERROR;

  constructor(public payload: string) {}
}

/*--------------GetCurrentUserEventsParticipant--------------*/

export class GetCurrentUserEvent implements Action {
  readonly type = ActionTypes.GET_USER_EVENT;

  constructor(public payload: number) {}
}

export class GetCurrentUserEventSuccess implements Action {
  readonly type = ActionTypes.GET_USER_EVENT_SUCCESS;

  constructor(public payload: Event[]) {}
}

export class GetCurrentUserEventError implements Action {
  readonly type = ActionTypes.GET_USER_EVENT_ERROR;

  constructor(public payload: string) {}
} 

/*--------------UpdateParticipantStatusInEvent--------------*/

export class UpdateUserParticipant implements Action {
  readonly type = ActionTypes.UPDATE_USER_PARTICIPANT;

  constructor(public payload: any[]) {}
}

export class UpdateUserParticipantSuccess implements Action {
  readonly type = ActionTypes.UPDATE_USER_PARTICIPANT_SUCCESS;

  constructor(public payload: Update<User>) {}
}

export class UpdateUserParticipantError implements Action {
  readonly type = ActionTypes.UPDATE_USER_PARTICIPANT_ERROR;

  constructor(public payload: string) {}
}

/*--------------AddPostToEvent--------------*/

export class AddPostToEvent implements Action {
  readonly type = ActionTypes.ADD_POST_EVENT;

  constructor(public payload: Post) {}
}

export class AddPostToEventSuccess implements Action {
  readonly type = ActionTypes.ADD_POST_EVENT_SUCCESS;

  constructor(public payload: Update<Post>) {}
}

export class AddPostToEventError implements Action {
  readonly type = ActionTypes.ADD_POST_EVENT_ERROR;

  constructor(public payload: string) {}
}

/*--------------DeletePostInEvent--------------*/

export class DeletePost implements Action {
  readonly type = ActionTypes.REMOVE_POST_EVENT;

  constructor(public payload: number[]) {}
}

export class DeletePostSuccess implements Action {
  readonly type = ActionTypes.REMOVE_POST_EVENT_SUCCESS;

  constructor(public payload: number) {}
}

export class DeletePostError implements Action {
  readonly type = ActionTypes.REMOVE_POST_EVENT_ERROR;

  constructor(public payload: string) {}
}

export type Actions =
  | LoadEvents
  | LoadEventsSuccess
  | LoadEventsError

  | LoadEvent
  | LoadEventSuccess
  | LoadEventError

  | LoadEditEvent
  | LoadEditEventSuccess
  | LoadEditEventError

  | CreateEvent
  | CreateEventSuccess
  | CreateEventError

  | UpdateEvent
  | UpdateEventSuccess
  | UpdateEventError

  | DeleteEvent
  | DeleteEventSuccess
  | DeleteEventError

  | AddEventParticipant
  | AddEventParticipantSuccess
  | AddEventParticipantError
  
  | SaveImage
  | SaveImageSuccess
  | SaveImageError

  | UpdateImage
  | UpdateImageSuccess
  | UpdateImageError

  | GetCurrentUserEvent
  | GetCurrentUserEventSuccess
  | GetCurrentUserEventError

  | UpdateUserParticipant
  | UpdateUserParticipantSuccess
  | UpdateUserParticipantError

  | AddPostToEvent
  | AddPostToEventSuccess
  | AddPostToEventError

  | DeletePost
  | DeletePostSuccess
  | DeletePostError;
