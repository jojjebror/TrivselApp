import { Action } from '@ngrx/store';

import { User, LoginRequest, Error } from '../../../shared/models';

export enum ActionTypes {
  Initialize = '[Initializer] Initialize',

  SetUser = '[Initializer] SetUser',
  SetUserNull = '[Initializer] SetUser null',
  SetUserSuccess = '[API: /user] SetUser success',
  SetUserError = '[API: /user] SetUser error',

  GetUsers = '[User] GetUsers',
  GetUsersSuccess = '[API/: User] GetUsersSuccess',
  GetUsersError = '[API/: User] GetUsersError'
}

/**
 * Initialize
 */
export class Initialize implements Action {
  readonly type = ActionTypes.Initialize;
}

/**
 * User
 */
export class SetUser implements Action {
  readonly type = ActionTypes.SetUser;
}

export class SetUserNull implements Action {
  readonly type = ActionTypes.SetUserNull;
}

export class SetUserSuccess implements Action {
  readonly type = ActionTypes.SetUserSuccess;

  constructor(public user: User) {}
}

export class SetUserError implements Action {
  readonly type = ActionTypes.SetUserError;
  public error: Error;
}


export type Actions = Initialize | SetUser | SetUserNull | SetUserSuccess | SetUserError;
