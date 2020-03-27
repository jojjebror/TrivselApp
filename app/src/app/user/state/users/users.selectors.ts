import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';
import { adapter } from './users.adapter';

const { selectAll } = adapter.getSelectors();

export const selectState = (state: AppState) => state.user.users;

export const getUsers = createSelector(selectState, selectAll);

export const getUsersLoading = createSelector(selectState, state => state.loading);

export const getUsersLoaded = createSelector(selectState, state => state.loaded);

export const getError = createSelector(selectState, state => state.error);

export const getAllUsers = createSelector(selectState, state => state.entities);


/* export const getCurrentUserId = createSelector(selectState, state => state.selectedUserId);

export const getCurrentUser = createSelector(selectState, getCurrentUserId, state => state.entities[state.selectedUserId]);

export const getCurrentUsers = createSelector(selectState, getCurrentUserId, state => state.); */