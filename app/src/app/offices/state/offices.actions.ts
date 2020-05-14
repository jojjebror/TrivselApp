import { Action } from '@ngrx/store';
import { Office } from 'src/app/shared/models/dto/OfficeDto';

export enum ActionTypes {
GET_OFFICES = '[User view] Get Offices',
GET_OFFICES_SUCCESS = '[API: /user] get offices success',
GET_OFFICES_ERROR = '[API: /user] get offices error'
}

/*--------------GetOffices--------------*/
export class GetOffices implements Action {
    readonly type = ActionTypes.GET_OFFICES;
  }
  
  export class GetOfficesSuccess implements Action {
    readonly type = ActionTypes.GET_OFFICES_SUCCESS;
  
    constructor(public payload: Office[]) {}
  }
  
  export class GetOfficesError implements Action {
    readonly type = ActionTypes.GET_OFFICES_ERROR;
  
    constructor(public payload: string) {}
  }
  export type Actions =
  | GetOffices
  | GetOfficesSuccess
  | GetOfficesError;  