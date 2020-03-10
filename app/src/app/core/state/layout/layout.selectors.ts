import { createSelector } from '@ngrx/store';

import { AppState } from '../app.model';

export const selectState = (state: AppState) => state.layout;
export const selectMenuVisible = createSelector(selectState, state => state.menuVisible);