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
    case officesActions.ActionTypesO.LOAD_OFFICES: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case officesActions.ActionTypesO.LOAD_OFFICES_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,
        selectedOfficeId: null,
      });
    }

    case officesActions.ActionTypesO.LOAD_OFFICES_ERROR: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}