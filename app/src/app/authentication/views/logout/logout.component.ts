import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services';

@Component({
	selector: 'ex-authentication-logout',
	templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

	constructor(private authenticationService: AuthenticationService,
		private router: Router) { }

	ngOnInit(): void { 
		this.authenticationService.logoutCallback();
		this.router.navigate(['/']);
	}
}