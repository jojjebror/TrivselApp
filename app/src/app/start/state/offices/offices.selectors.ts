import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';

import { adapter } from './offices.adapter';

const { selectAll } = adapter.getSelectors();

export const selectState = (state: AppState) => state.home.offices;

export const getOffices = createSelector(selectState, selectAll);

export const getUserOffice = (name: string) => createSelector(getOffices, (state) => state.find((office) => office.name == name))

export const getOfficesLoading = createSelector(selectState, (state) => state.loading);

export const getOfficesLoaded = createSelector(selectState, (state) => state.loaded);

export const getError = createSelector(selectState, (state) => state.error);

export const getCurrentOfficeId = createSelector(selectState, (state) => state.selectedOfficeId);

const { selectIds, selectEntities } = adapter.getSelectors(selectState);