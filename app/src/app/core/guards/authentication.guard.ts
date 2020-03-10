import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from '../services';

@Injectable()
export class AuthenticationGuard implements CanActivate {

	constructor(private router: Router,
		private authenticationService: AuthenticationService) { }

	canActivate(): Observable<boolean> {
		return this.isAuthenticatedOrRedirect();
	}

	canActivateChild(): Observable<boolean> {
		return this.isAuthenticatedOrRedirect();
	}

	private isAuthenticatedOrRedirect(): Observable<boolean> {
		return this.authenticationService.isAuthenticated().pipe(
			tap(isAuthenticated => {
				if (!isAuthenticated)
					this.router.navigate(['/login']);
			})
		);
	}
}