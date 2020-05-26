import { OfficesState } from './offices.model';

import { adapter } from './offices.adapter';
import * as officesActions from './offices.actions';

let initialState = adapter.getInitialState({
  selectedOfficeId: null,
  loading: false,
  loaded: false,
  error: null
});

export function reducer(state: OfficesState = initialState, action: officesActions.Actions): OfficesState {
  switch (action.type) {
    case officesActions.ActionTypes.LOAD_OFFICES: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case officesActions.ActionTypes.LOAD_OFFICES_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,
        selectedOfficeId: null,
      });
    }

    case officesActions.ActionTypes.LOAD_OFFICES_ERROR: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case officesActions.ActionTypes.UPDATE_OFFICE_SUCCESS: {
      return adapter.updateOne(action.payload, state);
    }

    case officesActions.ActionTypes.UPDATE_OFFICE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case officesActions.ActionTypes.CREATE_OFFICE_SUCCESS: {
      return adapter.addOne(action.payload, state);
    }

    case officesActions.ActionTypes.CREATE_OFFICE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}