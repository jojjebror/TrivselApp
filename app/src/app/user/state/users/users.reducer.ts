import { UsersState } from './users.model';

import { adapter } from './users.adapter';
import * as usersActions from './users.actions';

let initialState = adapter.getInitialState({
  selectedUserId: null,
  //offices: [],
  loading: false,
  loaded: false,
  error: '',
  user: null,
  event: []
});

export function reducer(state: UsersState = initialState, action: usersActions.Actions): UsersState {
  switch (action.type) {
    /* case usersActions.ActionTypes.GET_USERS: {
      return {
        ...state,
        loading: true,
      };
    } */

    case usersActions.ActionTypes.GET_USERS_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    }

    case usersActions.ActionTypes.GET_USERS_ERROR: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

     case usersActions.ActionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        event: action.payload.events,
        selectedUserId: action.payload.id,
      };
    } 

    default:
      return state;
  }
}
