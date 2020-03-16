import { Action } from '@ngrx/store';

import { Event } from '../../../shared/models';

export enum ActionTypes {
  Load = '[Events view] Load',
  LoadSuccess = '[API: /event] Load success',
  LoadError = '[API: /event] Load error',

  LoadEv = '[Events view] Load ev',
  LoadEvSuccess = '[API: /event] Load ev success',
  LoadEvError = '[API: /event] Load ev error',

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

export class LoadEv implements Action {
  readonly type = ActionTypes.LoadEv;

  constructor(public payload: number) {}
}

export class LoadEvSuccess implements Action {
  readonly type = ActionTypes.LoadEvSuccess;

  constructor(public ev: Event) {}
}

export class LoadEvError implements Action {
  readonly type = ActionTypes.LoadEvError;

  constructor(payload: string) {}
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

export type Actions = Load | LoadSuccess | LoadError | LoadEv | LoadEvSuccess | LoadEvError | Create | CreateSuccess | CreateError;
