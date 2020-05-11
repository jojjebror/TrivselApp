import { Action } from '@ngrx/store';
import { State } from './loading.model';
import { ACTION_KEY } from './loading.constant';
import { LoadingAction } from './loading.model';
import { ActionTypes, Actions } from './loading.action';

const initialState = new State();

export function reducer(state = initialState, action: Action | LoadingAction): State {
  // any action that has fxLoading property with `add` or `remove`
  if (action[ACTION_KEY]) {
    if (action[ACTION_KEY].add) {
      state = {
        data: [...state.data.filter((id) => id !== action[ACTION_KEY].add), action[ACTION_KEY].add],
      };
    }

    if (action[ACTION_KEY].remove) {
      state = {
        data: state.data.filter((id) => id !== action[ACTION_KEY].remove),
      };
    }
  }

  return state;
}
