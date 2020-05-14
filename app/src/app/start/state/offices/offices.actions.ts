import { Action } from '@ngrx/store';
import { Office } from '../../../shared/models';
import { LoadingAction } from '../../../core/state/loading';

export enum ActionTypes {
  LOAD_OFFICES = '[Offices view] Load Offices',
  LOAD_OFFICES_SUCCESS = '[API: /home/offices] Load Offices success',
  LOAD_OFFICES_ERROR = '[API: //home/offices] Load Offices error',
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

export type Actions = LoadOffices | LoadOfficesSuccess | LoadOfficesError;