import { Action } from '@ngrx/store';
import { Observable, from } from 'rxjs';

import * as errorActions from './error.actions';

export function handleError(specificErrorAction: Action): any {
	return (error: any, caught: Observable<any>): Observable<Action> => {
		return from([specificErrorAction, new errorActions.HandleError(error)]);
    }
}