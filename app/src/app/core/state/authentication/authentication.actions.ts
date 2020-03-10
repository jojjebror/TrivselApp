import { Action } from '@ngrx/store';

import { Error, AuthenticationProvider } from '../../../shared/models';

export enum ActionTypes {
	Authenticate = '[Login view] Authenticate',
	AthenticateCancel = '[Authentication server] Authenticate cancel',
	AuthenticateSuccess = '[Authentication server] Authenticate success',
	Logout = '[Menu component] Logout',
	LogoutSuccess = '[Authentication server] Logout success'
}

export class Authenticate implements Action {
	readonly type = ActionTypes.Authenticate;

	constructor(public provider: AuthenticationProvider) { }
}

export class AuthenticateCancel implements Action {
	readonly type = ActionTypes.AthenticateCancel;
}

export class AuthenticateSuccess implements Action {
	readonly type = ActionTypes.AuthenticateSuccess;
}

export class Logout implements Action {
	readonly type = ActionTypes.Logout;
}

export class LogoutSuccess implements Action {
	readonly type = ActionTypes.LogoutSuccess;
}

export type Actions = 
	Authenticate | AuthenticateSuccess;