import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../core/services';

@Component({
	selector: 'ex-authentication-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	constructor(private authenticationService: AuthenticationService) { }

	ngOnInit(): void { 
		this.authenticationService.authenticationCallback();
	}
}