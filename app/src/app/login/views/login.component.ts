import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../core/state';
import * as authentication from '../../core/state/authentication';

import { AuthenticationProvider } from '../../shared/models';

@Component({
	selector: 'ex-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

	constructor(private store$: Store<AppState>) { }

	ngOnInit(): void {
	}

	authenticate(provider?: AuthenticationProvider): void {
		this.store$.dispatch(new authentication.Authenticate(provider));
	}
}