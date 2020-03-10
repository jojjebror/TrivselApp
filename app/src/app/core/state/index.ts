import { ActionReducerMap } from '@ngrx/store';

import * as fromAuthentication from './authentication';
import * as fromLayout from './layout';
import * as fromSession from './session';

import { AppState } from './app.model';

export { AppState } from './app.model';

export const effects = [
	fromAuthentication.AuthenticationEffects,
	fromSession.SessionEffects
];

export const reducers: ActionReducerMap<AppState> = {
	layout: fromLayout.reducer,
	session: fromSession.reducer
};