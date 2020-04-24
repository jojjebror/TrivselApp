import { ActionReducerMap } from '@ngrx/store';

import * as fromPrices from './prices';

import { PriceState } from './price.model'

export { PriceState } from './price.model';

export const effects = [fromPrices.PricesEffects];

export const reducers: ActionReducerMap<PriceState> = {
  prs: fromPrices.reducer
};
