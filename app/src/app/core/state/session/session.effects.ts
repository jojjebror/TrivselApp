import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { UserResource } from '../../resources';
import { AuthenticationService } from '../../services';
import * as sessionActions from './session.actions';
import { User } from '../../../shared/models';

@Injectable()
export class SessionEffects {

	constructor(private actions$: Actions,
		private router: Router,
		private userResource: UserResource,
		private authenticationService: AuthenticationService) { }

	/**
	 * Initialization
	 */
	@Effect()
	initialize$: Observable<Action> = this.actions$.pipe(
		ofType(sessionActions.ActionTypes.Initialize),
		switchMap(_ => this.authenticationService.isAuthenticated()),
		map(isAuthenticated => {
			if (isAuthenticated)
				return new sessionActions.SetUser();
			return new sessionActions.SetUserNull();
		})
	);

	/**
	 * User
	 */
	@Effect()
	setUser$: Observable<Action> = this.actions$.pipe(
		ofType(sessionActions.ActionTypes.SetUser),
		switchMap(_ => {
			return this.userResource.getAuthenticated().pipe(
				map((user: User) => new sessionActions.SetUserSuccess(user))
			);
		})
	);
}