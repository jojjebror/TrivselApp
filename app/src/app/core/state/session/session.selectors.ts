import { createSelector } from '@ngrx/store';

import { AppState } from '../app.model';

export const selectState = (state: AppState) => state.session;
export const selectInitialized = createSelector(selectState, state => state.initialized);
export const selectUser = createSelector(selectState, state => state.user);