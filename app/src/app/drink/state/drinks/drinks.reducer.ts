import { DrinksState } from './drinks.model';

import { adapter } from './drinks.adapter';
import * as drinksActions from './drinks.actions';

let initialState = adapter.getInitialState({
  selectedDrinkId: null,
  loading: false,
  loaded: false,
  error: ''
});

export function reducer(state: DrinksState = initialState, action: drinksActions.Actions): DrinksState {
  switch (action.type) {
    case drinksActions.ActionTypes.LOAD_DRINKS_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case drinksActions.ActionTypes.LOAD_DRINKS_ERROR: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case drinksActions.ActionTypes.LOAD_DRINK_SUCCESS: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedDrinkId: action.payload.id
      });
    }

    case drinksActions.ActionTypes.LOAD_DRINK_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case drinksActions.ActionTypes.CREATE_DRINK_SUCCESS: {
      return adapter.addOne(action.payload, state);
    }

    case drinksActions.ActionTypes.CREATE_DRINK_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

      case drinksActions.ActionTypes.DELETE_DRINK: {
        return adapter.removeOne(action.payload, state);
      }
      case drinksActions.ActionTypes.DELETE_DRINK_ERROR: {
        return {
          ...state,
          error: action.payload
        };
      }
  
      default: {
        return state;
      }
    }
  }

