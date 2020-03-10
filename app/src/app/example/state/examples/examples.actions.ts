import { Action } from '@ngrx/store';

import { Example } from '../../../shared/models';

export enum ActionTypes {
	Load = '[Examples view] Load',
	LoadSuccess = '[API: /example] Load success',
	LoadError = '[API: /example] Load error',

	Create = '[Examples view] Create',
	CreateSuccess = '[API: /example] Create success',
	CreateError = '[API: /example] Create error',
}

export class Load implements Action {
	readonly type = ActionTypes.Load;
}

export class LoadSuccess implements Action {
	readonly type = ActionTypes.LoadSuccess;

	constructor(public examples: Example[]) {}
}

export class LoadError implements Action {
	readonly type = ActionTypes.LoadError;
}

export class Create implements Action {
	readonly type = ActionTypes.Create;

	constructor(public example: Example) {}
}

export class CreateSuccess implements Action {
	readonly type = ActionTypes.CreateSuccess;

	constructor(public example: Example) {}
}

export class CreateError implements Action {
	readonly type = ActionTypes.CreateError;
}

export type Actions =
	Load | LoadSuccess | LoadError |
	Create | CreateSuccess | CreateError;