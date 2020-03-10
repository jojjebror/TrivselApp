import { LayoutState } from './layout.model';
import * as layoutActions from './layout.actions';

let isLargeScreen = window.innerWidth > 599;

const initialState: LayoutState = {
	menuVisible: isLargeScreen
};

export function reducer(state: LayoutState = initialState, action: layoutActions.Actions): LayoutState {

	switch (action.type) {

		case layoutActions.ActionTypes.ToggleMenu: {
			return {
				...state,
				menuVisible: !state.menuVisible
			};
		}

		case layoutActions.ActionTypes.HideMenu: {
			return {
				...state,
				menuVisible: false
			};
		}

		default:
			return state;

	}

}