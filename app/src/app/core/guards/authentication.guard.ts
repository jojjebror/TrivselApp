import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from '../services';
import { User } from 'src/app/shared/models';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  isAdmin: boolean = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(): Observable<boolean> {
    return this.isAuthenticatedOrRedirect();
  }

  canActivateChild(): Observable<boolean> {
    return this.isAuthenticatedOrRedirect();
  }

  private isAuthenticatedOrRedirect(): Observable<boolean> {
    return this.authenticationService.isAuthenticated().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) this.router.navigate(['/login']);
      })
    );
  }
  /* private isAdminOrRedirect(): Observable<boolean> {
		return this.authenticationService.getUser().subscribe(data: User) => {
			this.isAdmin = data.
			

		}
		} */
}
