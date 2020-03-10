import { Component, Input, Output, EventEmitter } from '@angular/core';

import { LoginRequest } from '../../../shared/models';

/**
 * Form for logging into the application. Emits login
 * event when user submits the form.
 */
@Component({
	selector: 'ex-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

	@Input() error: string;

	@Output() login = new EventEmitter<LoginRequest>();

	loginRequest: LoginRequest = new LoginRequest();

	constructor() { }

	submit(): void {
		this.login.emit(this.loginRequest);
	}
}