import { Action } from '@ngrx/store';
import { LoadingAction } from '../../../core/state/loading';
import { User, Error } from '../../../shared/models';
import { Update } from '@ngrx/entity';

export enum ActionTypes {
  GET_USERS = '[User view] Get Users',
  GET_USERS_SUCCESS = '[API: /user] Get Users Success',
  GET_USERS_ERROR = '[API: /user] Get Users Error',

  UPDATE_CREDIT = '[User view] Update Credit',
  UPDATE_CREDIT_SUCCESS = '[API: /user] Update Credit success',
  UPDATE_CREDIT_ERROR = '[API: /user] Update Credit error',

  UPDATE_OFFICE = '[User view] Update Office',
  UPDATE_OFFICE_SUCCESS = '[API: /user] Update Office success',
  UPDATE_OFFICE_ERROR = '[API: /user] Update Office error',

  UPDATE_ADMIN_STATUS = '[User view] Update Admin Status',
  UPDATE_ADMIN_STATUS_SUCCESS = '[API: /user] Update Admin Status success',
  UPDATE_ADMIN_STATUS_ERROR = '[API: /user] Update Admin Status error',

  DELETE_USER = '[User view] Delete User',
  DELETE_USER_SUCCESS = '[API: /user] Delete User success',
  DELETE_USER_ERROR = '[API: /user] Delete User error',
}

/*--------------GetAllUsers--------------*/

export class GetUsers implements Action {
  readonly type = ActionTypes.GET_USERS;
  //fxLoading = { add: ActionTypes.GET_USERS };
}

export class GetUsersSuccess implements Action {
  readonly type = ActionTypes.GET_USERS_SUCCESS;
  //fxLoading = { remove: ActionTypes.GET_USERS };

  constructor(public payload: User[]) {}
}

export class GetUsersError implements Action {
  readonly type = ActionTypes.GET_USERS_ERROR;

  constructor(public payload: string) {}
}

/*--------------UpdateCredit--------------*/

export class UpdateCredit implements Action {
  readonly type = ActionTypes.UPDATE_CREDIT;
  fxLoading = { add: ActionTypes.UPDATE_CREDIT };

  constructor(public payload: any[]) {}
}

export class UpdateCreditSuccess implements Action {
  readonly type = ActionTypes.UPDATE_CREDIT_SUCCESS;
  fxLoading = { remove: ActionTypes.UPDATE_CREDIT };

  constructor(public payload: Update<User>) {}
}

export class UpdateCreditError implements Action {
  readonly type = ActionTypes.UPDATE_CREDIT_ERROR;

  constructor(public payload: string) {}
}

/*--------------UpdateOffice--------------*/

export class UpdateOffice implements Action {
  readonly type = ActionTypes.UPDATE_OFFICE;
  fxLoading = { add: ActionTypes.UPDATE_OFFICE };

  constructor(public payload: any[]) {}
}

export class UpdateOfficeSuccess implements Action {
  readonly type = ActionTypes.UPDATE_OFFICE_SUCCESS;
  fxLoading = { remove: ActionTypes.UPDATE_OFFICE };

  constructor(public payload: Update<User>) {}
}

export class UpdateOfficeError implements Action {
  readonly type = ActionTypes.UPDATE_OFFICE_ERROR;

  constructor(public payload: string) {}
}

/*--------------UpdateAdmin--------------*/

export class UpdateAdminStatus implements Action {
  readonly type = ActionTypes.UPDATE_ADMIN_STATUS;
  //fxLoading = { add: ActionTypes.UPDATE_ADMIN_STATUS };

  constructor(public payload: any[]) {}
}

export class UpdateAdminStatusSuccess implements Action {
  readonly type = ActionTypes.UPDATE_ADMIN_STATUS_SUCCESS;
  //fxLoading = { remove: ActionTypes.UPDATE_ADMIN_STATUS };

  constructor(public payload: Update<User>) {}
}

export class UpdateAdminStatusError implements Action {
  readonly type = ActionTypes.UPDATE_ADMIN_STATUS_ERROR;

  constructor(public payload: string) {}
}

/*--------------RemoveUser--------------*/

export class DeleteUser implements Action {
  readonly type = ActionTypes.DELETE_USER;
  //fxLoading = { add: ActionTypes.DELETE_USER };

  constructor(public payload: number) {}
}

export class DeleteUserSuccess implements Action {
  readonly type = ActionTypes.DELETE_USER_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteUserError implements Action {
  readonly type = ActionTypes.DELETE_USER_ERROR;

  constructor(public payload: string) {}
}


export type Actions =
  | GetUsers
  | GetUsersSuccess
  | GetUsersError

  | UpdateCredit
  | UpdateCreditSuccess
  | UpdateCreditError

  | UpdateOffice
  | UpdateOfficeSuccess
  | UpdateOfficeError

  | UpdateAdminStatus
  | UpdateAdminStatusSuccess
  | UpdateAdminStatusError
  
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserError;
  
