import { EventsState } from './events.model';

import { adapter } from './events.adapter';
import * as eventsActions from './events.actions';

let initialState = adapter.getInitialState({
  selectedEventId: null,
  users: [],
  posts: [],
  userEvents: [],

  error: null
});

export function reducer(state: EventsState = initialState, action: eventsActions.Actions): EventsState {
  switch (action.type) {
    case eventsActions.ActionTypes.LOAD_EVENTS: {
      return {
        ...state,
      };
    }

    case eventsActions.ActionTypes.LOAD_EVENTS_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        selectedEventId: null,
        users: [],
      });
    }

    case eventsActions.ActionTypes.LOAD_EVENTS_ERROR: {
      return {
        ...state,
        entities: {},
        error: action.payload,
      };
    }

    case eventsActions.ActionTypes.LOAD_EVENT_SUCCESS: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedEventId: action.payload.id,
        users: action.payload.users,
        posts: action.payload.posts,
      });
    }

    case eventsActions.ActionTypes.LOAD_EVENT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case eventsActions.ActionTypes.LOAD_EDIT_EVENT_SUCCESS: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedEventId: action.payload.id,
        users: action.payload.users,
      });
    }

    case eventsActions.ActionTypes.LOAD_EDIT_EVENT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case eventsActions.ActionTypes.CREATE_EVENT_SUCCESS: {
      return adapter.addOne(action.payload, state);
    }

    case eventsActions.ActionTypes.CREATE_EVENT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case eventsActions.ActionTypes.UPLOAD_IMAGE_SUCCESS: {
      return adapter.updateOne(action.payload, state);
    }

    case eventsActions.ActionTypes.UPLOAD_IMAGE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case eventsActions.ActionTypes.UPDATE_EVENT_SUCCESS: {
      return adapter.updateOne(action.payload, state);
    }

    case eventsActions.ActionTypes.UPDATE_EVENT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case eventsActions.ActionTypes.DELETE_EVENT: {
      return adapter.removeOne(action.payload, state);
    }
    case eventsActions.ActionTypes.DELETE_EVENT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case eventsActions.ActionTypes.ADD_EVENT_PARTICIPANT_SUCCESS: {
      return adapter.updateOne(action.payload, state);
    }

    case eventsActions.ActionTypes.ADD_EVENT_PARTICIPANT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case eventsActions.ActionTypes.GET_USER_EVENT_SUCCESS: {
      return {
        ...state,
        userEvents: action.payload,
      };
    }
    case eventsActions.ActionTypes.GET_USER_EVENT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case eventsActions.ActionTypes.UPDATE_USER_PARTICIPANT_SUCCESS: {
      return adapter.updateOne(action.payload, state);
    }

    case eventsActions.ActionTypes.UPDATE_USER_PARTICIPANT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case eventsActions.ActionTypes.ADD_POST_EVENT_SUCCESS: {
      return adapter.updateOne(action.payload, state);
    }

    case eventsActions.ActionTypes.ADD_POST_EVENT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case eventsActions.ActionTypes.REMOVE_POST_EVENT_SUCCESS: {
      return adapter.removeOne(action.payload, state);
    }
    case eventsActions.ActionTypes.REMOVE_POST_EVENT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}
