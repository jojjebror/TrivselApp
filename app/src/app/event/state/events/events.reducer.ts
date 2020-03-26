import { EventsState } from './events.model';

import { adapter } from './events.adapter';
import * as eventsActions from './events.actions';

let initialState = adapter.getInitialState({
  selectedEventId: null,
  loading: false,
  loaded: false,
  error: ''
});

export function reducer(state: EventsState = initialState, action: eventsActions.Actions): EventsState {
  switch (action.type) {
    case eventsActions.ActionTypes.LOAD_EVENTS_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case eventsActions.ActionTypes.LOAD_EVENTS_ERROR: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case eventsActions.ActionTypes.LOAD_EVENT_SUCCESS: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedEventId: action.payload.id
      });
    }

    case eventsActions.ActionTypes.LOAD_EVENT_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case eventsActions.ActionTypes.CREATE_EVENT_SUCCESS: {
      return adapter.addOne(action.payload, state);
    }

    case eventsActions.ActionTypes.CREATE_EVENT_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case eventsActions.ActionTypes.UPDATE_EVENT_SUCCESS: {
      return adapter.updateOne(action.payload, state);
    }

    case eventsActions.ActionTypes.UPDATE_EVENT_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
}
