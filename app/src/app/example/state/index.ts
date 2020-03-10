import { ActionReducerMap } from '@ngrx/store';

import * as fromExamples from './examples';

import { ExampleState } from './example.model';

export { ExampleState } from './example.model';

export const effects = [
	fromExamples.ExamplesEffects
];

export const reducers: ActionReducerMap<ExampleState> = {
	examples: fromExamples.reducer
};