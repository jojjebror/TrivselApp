import { DrinksState } from './drinks.model';

import { adapter } from './drinks.adapter';
import * as drinksActions from './drinks.actions';

let initialState = adapter.getInitialState({
  loading: false
});

export function reducer(state: DrinksState = initialState, action: drinksActions.Actions): DrinksState {
  switch (action.type) {
    case drinksActions.ActionTypes.Load:
      return {
        ...state,
        loading: true
      };

    case drinksActions.ActionTypes.LoadSuccess:
      return adapter.addAll(action.drs, {
        ...state,
        loading: false
      });

    case drinksActions.ActionTypes.LoadError:
      return {
        ...state,
        loading: false
      };

    case drinksActions.ActionTypes.CreateSuccess:
      return adapter.addOne(action.dr, state);

      case drinksActions.ActionTypes.DeleteSuccess: {
        return adapter.removeOne(action.drs, state);
      }
      case drinksActions.ActionTypes.DeleteError: {
        return {
          ...state,
          loading: false
        };
      }

    default:
      return state;
  }
}