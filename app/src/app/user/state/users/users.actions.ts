import { Action } from '@ngrx/store';

import { User, Error } from '../../../shared/models';

export enum ActionTypes {
  GET_USERS = '[User view] Get Users',
  GET_USERS_SUCCESS = '[API: /user] Get Users Success',
  GET_USERS_ERROR = '[API: /user] Get Users Error',

  GET_USER = '[User view] Get User',
  GET_USER_SUCCESS = '[API: /user] Get User Success',
  GET_USER_ERROR = '[API: /user] Get User Error', 

  GET_OFFICES = '[User view] Get Offices',
  GET_OFFICES_SUCCESS = '[API: /user] Get Offices Success',
  GET_OFFICES_ERROR = '[API: /user] Get Offices Error',
}

export class GetUsers implements Action {
  readonly type = ActionTypes.GET_USERS;
}

export class GetUsersSuccess implements Action {
  readonly type = ActionTypes.GET_USERS_SUCCESS;

  constructor(public payload: User[]) {}
}

export class GetUsersError implements Action {
  readonly type = ActionTypes.GET_USERS_ERROR;

  constructor(public payload: string) {}
}
 
export class GetCurrentUser implements Action {
  readonly type = ActionTypes.GET_USER;

  constructor(public payload: number) {}
}

export class GetCurrentUserSuccess implements Action {
  readonly type = ActionTypes.GET_USER_SUCCESS;

  constructor(public payload: User) {}
}

export class GetCurrentUserError implements Action {
  readonly type = ActionTypes.GET_USER_ERROR;

  constructor(public payload: string) {}
} 

export class GetOffices implements Action {
  readonly type = ActionTypes.GET_OFFICES;
}

export class GetOfficesSuccess implements Action {
  readonly type = ActionTypes.GET_OFFICES_SUCCESS;

  constructor(public payload: User[]) {}
}

export class GetOfficesError implements Action {
  readonly type = ActionTypes.GET_OFFICES_ERROR;

  constructor(public payload: string) {}
}

export type Actions =
  | GetUsers
  | GetUsersSuccess
  | GetUsersError

  | GetCurrentUser
  | GetCurrentUserSuccess
  | GetCurrentUserError

  | GetOffices
  | GetOfficesSuccess
  | GetOfficesError;
