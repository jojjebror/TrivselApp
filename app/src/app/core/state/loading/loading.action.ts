import { Action } from '@ngrx/store';
import { MODULE_ID } from './loading.constant';
import { LoadingAction } from './loading.model';

export enum ActionTypes {
  Add = '[@fx/ngrx/loading] Add',
  Remove = '[@fx/ngrx/loading] Remove',
}

export class Add implements Action, Partial<LoadingAction> {
  readonly type = ActionTypes.Add;
  fxLoading: { add: string };
  constructor(add: string) {
    this.fxLoading = { add };
  }
}

export class Remove implements Action, Partial<LoadingAction> {
  readonly type = ActionTypes.Remove;
  fxLoading: { remove: string };
  constructor(remove: string) {
    this.fxLoading = { remove };
  }
}

export type Actions = Add | Remove;
