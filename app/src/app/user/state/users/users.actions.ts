import { Action } from '@ngrx/store';

import { User, Error } from '../../../shared/models';

export enum ActionTypes {
  GET_USERS = '[User view] Get Users',
  GET_USERS_SUCCESS = '[API: /user] Get Users Success',
  GET_USERS_ERROR = '[API: /user] Get Users Error',
}

/*--------------GetAllUsers--------------*/

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


export type Actions =
  | GetUsers
  | GetUsersSuccess
  | GetUsersError

