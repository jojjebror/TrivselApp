import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';
import { adapter } from './events.adapter';

const { selectAll } = adapter.getSelectors();

export const selectState = (state: AppState) => state.event.evs;
export const selectLoading = createSelector(selectState, state => state.loading);
export const selectEvents = createSelector(selectState, selectAll);
