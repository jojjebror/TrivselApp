import { UsersState } from './users.model';

import { adapter } from './users.adapter';
import * as usersActions from './users.actions';

let initialState = adapter.getInitialState({
  selectedUserId: null,
  loading: false,
  loaded: false,
  error: '',
  //user: null,
});

export function reducer(state: UsersState = initialState, action: usersActions.Actions): UsersState {
  switch (action.type) {
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

    case usersActions.ActionTypes.UPDATE_CREDIT_SUCCESS: {
      return adapter.updateOne(action.payload, state);
    }

    case usersActions.ActionTypes.UPDATE_CREDIT_ERROR: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case usersActions.ActionTypes.UPDATE_OFFICE_SUCCESS: {
      return adapter.updateOne(action.payload, state);
    }
    case usersActions.ActionTypes.UPDATE_OFFICE_ERROR: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case usersActions.ActionTypes.UPDATE_ADMIN_STATUS_SUCCESS: {
      return adapter.updateOne(action.payload, state);
    }
    case usersActions.ActionTypes.UPDATE_ADMIN_STATUS_ERROR: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case usersActions.ActionTypes.DELETE_USER_SUCCESS: {
      return adapter.removeOne(action.payload, state);
    }
    case usersActions.ActionTypes.DELETE_USER_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}
