import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AuthenticationService } from '../../services';
import * as fromSession from '../session';
import * as fromAuthentication from './authentication.actions';

@Injectable()
export class AuthenticationEffects {

	constructor(private actions$: Actions,
		private router: Router,
		private authenticationService: AuthenticationService) {
	}

	@Effect()
	authenticate$: Observable<Action> = this.actions$.pipe(
		ofType(fromAuthentication.ActionTypes.Authenticate),
		map((action: fromAuthentication.Authenticate) => action.provider),
		switchMap(provider => this.authenticationService.authenticate(provider).pipe(
			map(_ => new fromAuthentication.AuthenticateSuccess()),
			catchError((err, caught) => of(new fromAuthentication.AuthenticateCancel()))
		))
	);

	@Effect()
	handleAuthenticationSuccess$: Observable<Action> = this.actions$.pipe(
		ofType(fromAuthentication.ActionTypes.AuthenticateSuccess),
		tap(_ => this.router.navigate(['/'])),
		map(_ => new fromSession.SetUser())
	);

	@Effect()
	logout$: Observable<Action> = this.actions$.pipe(
		ofType(fromAuthentication.ActionTypes.Logout),
		switchMap(provider => this.authenticationService.logout().pipe(
			map(_ => new fromAuthentication.LogoutSuccess())
		))
	);
}