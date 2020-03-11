import { Action } from '@ngrx/store';

import { Event } from '../../../shared/models';

export enum ActionTypes {
  Load = '[Events view] Load',
  LoadSuccess = '[API: /event] Load success',
  LoadError = '[API: /event] Load error',

  Create = '[Events view] Create',
  CreateSuccess = '[API: /event] Create success',
  CreateError = '[API: /event] Create error'
}

export class Load implements Action {
  readonly type = ActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LoadSuccess;

  constructor(public evs: Event[]) {}
}

export class LoadError implements Action {
  readonly type = ActionTypes.LoadError;
}

export class Create implements Action {
  readonly type = ActionTypes.Create;

  constructor(public ev: Event) {}
}

export class CreateSuccess implements Action {
  readonly type = ActionTypes.CreateSuccess;

  constructor(public ev: Event) {}
}

export class CreateError implements Action {
  readonly type = ActionTypes.CreateError;
}

export type Actions = Load | LoadSuccess | LoadError | Create | CreateSuccess | CreateError;
