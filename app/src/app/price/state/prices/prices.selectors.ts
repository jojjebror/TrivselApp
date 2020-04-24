import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';

import { adapter } from './prices.adapter';

const { selectAll } = adapter.getSelectors();

export const selectState = (state: AppState) => state.price.prs;

export const getPrices = createSelector(selectState, selectAll);

export const getPricesLoading = createSelector(selectState, (state) => state.loading);

export const getPricesLoaded = createSelector(selectState, (state) => state.loaded);

export const getError = createSelector(selectState, (state) => state.error);

export const getCurrentPriceId = createSelector(selectState, (state) => state.selectedPriceId)
