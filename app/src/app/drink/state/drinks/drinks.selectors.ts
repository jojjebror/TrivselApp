import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';
import { adapter } from './drinks.adapter';

const { selectAll } = adapter.getSelectors();

export const selectState = (state: AppState) => state.drink.drs;
export const selectLoading = createSelector(selectState, state => state.loading);
export const selectDrinks = createSelector(selectState, selectAll);
