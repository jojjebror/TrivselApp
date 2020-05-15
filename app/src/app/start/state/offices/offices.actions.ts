import { Action } from '@ngrx/store';
import { Office } from '../../../shared/models';
import { LoadingAction } from '../../../core/state/loading';
import { Update } from '@ngrx/entity';

export enum ActionTypes {
  LOAD_OFFICES = '[Offices view] Load Offices',
  LOAD_OFFICES_SUCCESS = '[API: /home/offices] Load Offices success',
  LOAD_OFFICES_ERROR = '[API: //home/offices] Load Offices error',

  UPDATE_OFFICE = '[Offices view] Update Office',
  UPDATE_OFFICE_SUCCESS = '[API: /home/offices] Update Office success',
  UPDATE_OFFICE_ERROR = '[API: //home/offices] Update Office error',

  CREATE_OFFICE = '[Offices view] Create Office',
  CREATE_OFFICE_SUCCESS = '[API: /home/offices] Create Office success',
  CREATE_OFFICE_ERROR = '[API: //home/offices] Create Office error',
}

/*--------------LoadOffices--------------*/

export class LoadOffices implements Action {
  readonly type = ActionTypes.LOAD_OFFICES;
  //fxLoading = { add: ActionTypes.LOAD_OFFICES };

}

export class LoadOfficesSuccess implements Action {
  readonly type = ActionTypes.LOAD_OFFICES_SUCCESS;
  //fxLoading = { remove: ActionTypes.LOAD_OFFICES };

  constructor(public payload: Office[]) {}
}

export class LoadOfficesError implements Action {
  readonly type = ActionTypes.LOAD_OFFICES_ERROR;

  constructor(public payload: string) {}
}

/*--------------UpdateOffices--------------*/

export class UpdateOffice implements Action {
  readonly type = ActionTypes.UPDATE_OFFICE;
  //fxLoading = { add: ActionTypes.UPDATE_OFFICE };

  constructor(public payload: Office) {}
}

export class UpdateOfficeSuccess implements Action {
  readonly type = ActionTypes.UPDATE_OFFICE_SUCCESS;
  //fxLoading = { remove: ActionTypes.UPDATE_OFFICE };

  constructor(public payload: Update<Office>) {}
}

export class UpdateOfficeError implements Action {
  readonly type = ActionTypes.UPDATE_OFFICE_ERROR;

  constructor(public payload: string) {}
}

/*--------------CreateOffice--------------*/

export class CreateOffice implements Action {
  readonly type = ActionTypes.CREATE_OFFICE;

  constructor(public payload: Office) {}
}

export class CreateOfficeSuccess implements Action {
  readonly type = ActionTypes.CREATE_OFFICE_SUCCESS;

  constructor(public payload: Office) {}
}

export class CreateOfficeError implements Action {
  readonly type = ActionTypes.CREATE_OFFICE_ERROR;

  constructor(public payload: string) {}
}


export type Actions =
  | LoadOffices
  | LoadOfficesSuccess
  | LoadOfficesError

  | UpdateOffice
  | UpdateOfficeSuccess
  | UpdateOfficeError

  | CreateOffice
  | CreateOfficeSuccess
  | CreateOfficeError;