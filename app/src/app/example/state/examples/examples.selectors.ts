import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';
import { adapter } from './examples.adapter';

const {
	selectAll
} = adapter.getSelectors();

export const selectState = (state: AppState) => state.example.examples;
export const selectLoading = createSelector(selectState, state => state.loading);
export const selectExamples = createSelector(selectState, selectAll);