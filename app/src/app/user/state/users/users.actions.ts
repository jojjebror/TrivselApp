import { Action } from '@ngrx/store';

import { User, Error } from '../../../shared/models';
import { Update } from '@ngrx/entity';

export enum ActionTypes {
  GET_USERS = '[User view] Get Users',
  GET_USERS_SUCCESS = '[API: /user] Get Users Success',
  GET_USERS_ERROR = '[API: /user] Get Users Error',
 
  UPDATE_CREDIT = "[User view] Update Credit",
  UPDATE_CREDIT_SUCCESS = "[API: /user] Update Credit success",
  UPDATE_CREDIT_ERROR = "[API: /user] Update Credit error",

  REMOVE_CREDIT = "[User view] Remove Credit",
  REMOVE_CREDIT_SUCCESS = "[API: /user] Remove Credit success",
  REMOVE_CREDIT_ERROR = "[API: /user] Remove Credit error",
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

/*--------------UpdateCredit--------------*/

export class UpdateCredit implements Action {
  readonly type = ActionTypes.UPDATE_CREDIT;

  constructor(public payload: User) {}
}

export class UpdateCreditSuccess implements Action {
  readonly type = ActionTypes.UPDATE_CREDIT_SUCCESS;

  constructor(public payload: Update<User>) {}
}

export class UpdateCreditError implements Action {
  readonly type = ActionTypes.UPDATE_CREDIT_ERROR;

  constructor(public payload: string) {}
}

/*--------------RemoveCredit--------------*/

export class removeCredit implements Action {
  readonly type = ActionTypes.REMOVE_CREDIT;

  constructor(public payload: User) {}
}

export class removeCreditkSuccess implements Action {
  readonly type = ActionTypes.REMOVE_CREDIT_SUCCESS;

  constructor(public payload: Update<User>) {}
}

export class removeCreditError implements Action {
  readonly type = ActionTypes.REMOVE_CREDIT_ERROR;

  constructor(public payload: string) {}
}


export type Actions =
  | GetUsers
  | GetUsersSuccess
  | GetUsersError
  | UpdateCredit
  | UpdateCreditSuccess
  | UpdateCreditError
  | removeCredit
  | removeCreditkSuccess
  | removeCreditError
  
