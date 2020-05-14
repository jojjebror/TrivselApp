import { OfficesState } from './offices.model';

import { adapter } from './offices.adapter';
import * as OfficesActions from './offices.actions';

let initialState = adapter.getInitialState({
  selectedOfficeId: null,
  loading: false,
  loaded: false,
  error: '',
});

export function reducer(state: OfficesState = initialState, action: OfficesActions.Actions): OfficesState {
  switch (action.type) {
case OfficesActions.ActionTypes.GET_OFFICES_SUCCESS: {
    return adapter.addAll(action.payload, {
      ...state,
      loading: false,
      loaded: true,
    });
  }

  case OfficesActions.ActionTypes.GET_OFFICES_ERROR: {
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