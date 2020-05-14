import { createSelector } from '@ngrx/store';

import { adapter } from './offices.adapter';
import { AppState } from 'src/app/core/state';

const { selectAll } = adapter.getSelectors();

export const selectState = (state: AppState) => state.offices;

export const getOffices = createSelector(selectState, selectAll );