import { UsersState } from './users.model';

import { adapter } from './users.adapter';
import * as usersActions from './users.actions';

let initialState = adapter.getInitialState({
  selectedUserId: null,
  //users: [],
  loading: false,
  loaded: false,
  error: ''
});

export function reducer(state: UsersState = initialState, action: usersActions.Actions): UsersState {
  switch (action.type) {

    case usersActions.ActionTypes.GET_USERS: {
      return {
        ...state,
        loading: true,
      };
    }

    case usersActions.ActionTypes.GET_USERS_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case usersActions.ActionTypes.GET_USERS_ERROR: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    default:
      return state;
  }
}
