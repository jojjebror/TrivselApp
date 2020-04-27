import { ActionReducerMap } from '@ngrx/store';

import * as fromDrinks from './drinks';

import { DrinkState } from './drink.model'

export { DrinkState } from './drink.model';


export const effects = [fromDrinks.DrinksEffects];

export const reducers: ActionReducerMap<DrinkState> = {
  drs: fromDrinks.reducer
};
