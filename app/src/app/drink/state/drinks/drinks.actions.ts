import { Action } from '@ngrx/store';

import { Drink } from '../../../shared/models';

export enum ActionTypes {
  Load = '[Drinks view] Load',
  LoadSuccess = '[API: /drink] Load success',
  LoadError = '[API: /drink] Load error',

  Create = '[Drinks view] Create',
  CreateSuccess = '[API: /drink] Create success',
  CreateError = '[API: /drink] Create error'
}

export class Load implements Action {
  readonly type = ActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LoadSuccess;

  constructor(public drs: Drink[]) {}
}

export class LoadError implements Action {
  readonly type = ActionTypes.LoadError;
}

export class Create implements Action {
  readonly type = ActionTypes.Create;

  constructor(public dr: Drink) {}
}

export class CreateSuccess implements Action {
  readonly type = ActionTypes.CreateSuccess;

  constructor(public dr: Drink) {}
}

export class CreateError implements Action {
  readonly type = ActionTypes.CreateError;
}

export type Actions = Load | LoadSuccess | LoadError | Create | CreateSuccess | CreateError;
