import { Injectable } from '@angular/core';
import { Observable, from as fromPromise } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserManager, UserManagerSettings, User, WebStorageStateStore } from 'oidc-client';

import { AuthenticationProvider } from '../../shared/models';

import { environment } from '../../../environments/environment';

/**
 * Wraps the oidc-client and handles user authentication
 */
@Injectable()
export class AuthenticationService {

	private manager = new UserManager({
		authority: environment.auth.authority,
		client_id: environment.auth.clientId,
		redirect_uri: environment.auth.redirectUrl,
		silent_redirect_uri: environment.auth.redirectUrl,
		post_logout_redirect_uri: environment.auth.logoutRedirectUrl,
		response_type: 'id_token token',
		scope: environment.auth.scope,
		loadUserInfo: false,
		filterProtocolClaims: true,
		userStore: new WebStorageStateStore({ store: window.localStorage })
	});

	constructor() { }

	isAuthenticated(): Observable<boolean> {
		return this.getUser().pipe(
			map(user => user != null && !user.expired)
		);
	}

	getAuthorizationHeaderValue(): Observable<string> {
		return this.getUser().pipe(
			map(user => `${user.token_type} ${user.access_token}`)
		);
	}

	authenticate(provider?: AuthenticationProvider): Observable<User> {
		let config = provider ? { extraQueryParams: { IdP: provider } } : {};
		return fromPromise(this.manager.signinPopup(config));
	}

	authenticationCallback(): Observable<any> {
		// this.manager.signinSilentCallback();
		return fromPromise(this.manager.signinPopupCallback());
	}

	refreshAuthentication(): Observable<any> {
		return fromPromise(this.manager.signinSilent());
	}

	logout(): Observable<any> {
		return fromPromise(this.manager.signoutRedirect());
	}

	logoutCallback(): Observable<any> {
		return fromPromise(this.manager.signoutRedirectCallback());
	}

	private getUser(): Observable<User> {
		return fromPromise(this.manager.getUser());
	}


}