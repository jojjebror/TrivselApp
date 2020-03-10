import { SessionState } from './session.model';
import * as sessionActions from './session.actions';

export const initialState: SessionState = {
	initialized: false,
	user: null
};

export function reducer(state: SessionState = initialState, action: sessionActions.Actions): SessionState {

	switch (action.type) {

		case sessionActions.ActionTypes.SetUserNull:
		case sessionActions.ActionTypes.SetUserError: {
			return {
				...state,
				initialized: true
			};
		}

		case sessionActions.ActionTypes.SetUserSuccess: {
			return {
				...state,
				user: action.user,
				initialized: true
			};
		}

		default:
			return state;

	}

}