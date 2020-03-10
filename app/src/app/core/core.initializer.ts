import { APP_INITIALIZER, Provider } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './state';
import * as session from './state/session';

export function initializeFactory(store$: Store<AppState>): Function {
	return () => store$.dispatch(new session.Initialize());
} 

export const initializer: Provider = {
	provide: APP_INITIALIZER,
	useFactory: initializeFactory,
	deps: [ Store ],
	multi: true
};