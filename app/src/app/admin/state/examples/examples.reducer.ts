import { ExamplesState } from './examples.model';

import { adapter } from './examples.adapter';
import * as examplesActions from './examples.actions';

let initialState = adapter.getInitialState({
	loading: false
});

export function reducer(state: ExamplesState = initialState, action: examplesActions.Actions): ExamplesState {

	switch (action.type) {

		case examplesActions.ActionTypes.Load:
			return {
				...state,
				loading: true
			};

		case examplesActions.ActionTypes.LoadSuccess:
			return adapter.addAll(action.examples, {
				...state,
				loading: false
			});

		case examplesActions.ActionTypes.LoadError:
			return {
				...state,
				loading: false
			};

		case examplesActions.ActionTypes.CreateSuccess:
			return adapter.addOne(action.example, state);

		default:
			return state;

	}

}