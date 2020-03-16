import { EventsState } from './events.model';

import { adapter } from './events.adapter';
import * as eventsActions from './events.actions';

let initialState = adapter.getInitialState({
  loading: false,
  selectedEventId: null
});

export function reducer(state: EventsState = initialState, action: eventsActions.Actions): EventsState {
  switch (action.type) {
    case eventsActions.ActionTypes.Load:
      return {
        ...state,
        loading: true
      };

    case eventsActions.ActionTypes.LoadSuccess:
      return adapter.addAll(action.evs, {
        ...state,
        loading: false
      });

    case eventsActions.ActionTypes.LoadError:
      return {
        ...state,
        loading: false
      };

    case eventsActions.ActionTypes.LoadEv:
      return {
        ...state,
        loading: true
      };

    case eventsActions.ActionTypes.LoadEvSuccess:
      return adapter.addOne(action.ev, {
        ...state,
        loading: false,
        selectedEventId: action.ev.id
      });

    case eventsActions.ActionTypes.LoadEvError:
      return {
        ...state,
        loading: false
      };

    case eventsActions.ActionTypes.CreateSuccess:
      return adapter.addOne(action.ev, state);

    default:
      return state;
  }
}