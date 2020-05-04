import { Action } from '@ngrx/store';

import { Error } from '../../../shared/models';

export enum ActionTypes {
  HandleError = '[Error handling] Handle error',
}

export class HandleError implements Action {
  readonly type = ActionTypes.HandleError;

  constructor(public error: Error) {}
}

export type Actions = HandleError;
