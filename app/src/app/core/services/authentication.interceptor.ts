import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

	constructor(public authenticationService: AuthenticationService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return this.authenticationService.getAuthorizationHeaderValue().pipe(
			map((authorizationHeaderValue: string) => request.clone({
				setHeaders: {
					Authorization: authorizationHeaderValue
				}
			})),
			switchMap((req: HttpRequest<any>) => next.handle(req))
		);
	}
}