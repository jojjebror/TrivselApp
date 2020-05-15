import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { ExampleResource } from '../../../core/resources';

import * as examplesActions from './examples.actions';

@Injectable()
export class ExamplesEffects {

	constructor(private actions$: Actions,
		private exampleResource: ExampleResource) { }


	@Effect()
	load$: Observable<Action> = this.actions$.pipe(
		ofType(examplesActions.ActionTypes.Load),
		switchMap(() => this.exampleResource.load().pipe(
			map(examples => new examplesActions.LoadSuccess(examples))
		))
	);

	@Effect()
	create$: Observable<Action> = this.actions$.pipe(
		ofType(examplesActions.ActionTypes.Create),
		map((action: examplesActions.Create) => action.example),
		switchMap(example => this.exampleResource.create(example).pipe(
			map(createdExample => new examplesActions.CreateSuccess(createdExample))
		))
	);

}