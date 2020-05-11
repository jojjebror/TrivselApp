import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';
import { adapter } from './receipts.adapter';



const { selectAll } = adapter.getSelectors();

export const selectState = (state: AppState) => state.receipt.res;

export const getReceipts = createSelector(selectState, selectAll);

export const getReceiptsLoading = createSelector(selectState, state => state.loading);

export const getReceiptsLoaded = createSelector(selectState, state => state.loaded);

export const getError = createSelector(selectState, state => state.error);

export const getReceiptCreatedByUser = createSelector(selectState, selectAll);
