import { Action } from '@ngrx/store';

import { Drink } from '../../../shared/models';

export enum ActionTypes {
  Load = '[Drinks view] Load',
  LoadSuccess = '[API: /drink] Load success',
  LoadError = '[API: /drink] Load error',
  Create = '[Drinks view] Create',
  CreateSuccess = '[API: /drink] Create success',
  CreateError = '[API: /drink] Create error',
  Delete = '[Drinks view] Delete',
  DeleteSuccess = '[API: /drink] Delete succes',
  DeleteError = '[API: /drink] Load rror'
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

export class Delete implements Action {
  readonly type = ActionTypes.Delete;

  constructor(public dr: number) {}
}

export class DeleteSuccess implements Action {
  readonly type = ActionTypes.DeleteSuccess;

  constructor(public drs: number) {}
}

export class DeleteError implements Action {
  readonly type = ActionTypes.DeleteError;

  constructor(public drs: string) {}
}

export class CreateSuccess implements Action {
  readonly type = ActionTypes.CreateSuccess;

  constructor(public dr: Drink) {}
}

export class CreateError implements Action {
  readonly type = ActionTypes.CreateError;
}

export type Actions = Load | LoadSuccess | LoadError | Create | CreateSuccess | CreateError | Delete | DeleteSuccess | DeleteError;
