import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResource } from './api.resource';

import { Example } from '../../shared/models';

@Injectable()
export class ExampleResource extends ApiResource {

	constructor(http: HttpClient) {
		super(http);
	}

	load(): Observable<Example[]> {
		return this.get('example');
	}

	create(example: Example): Observable<Example> {
		return this.post('example', example);
	}

}