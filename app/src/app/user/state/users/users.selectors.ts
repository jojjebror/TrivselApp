import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';
import { adapter } from './users.adapter';
import { User } from 'src/app/shared/models';

const { selectAll } = adapter.getSelectors();

export const selectState = (state: AppState) => state.user.users;

export const getUsers = createSelector(selectState, selectAll);

export const getRelevantUsers = (userId: number) => createSelector(getUsers, (state) => state.filter((user) => user.id != userId));

export const getAllUsersExceptInvited = (invitedUsers: User[]) =>
  createSelector(getUsers, (state) =>
    state.filter((x) => {
      return !invitedUsers.some((y) => {
        return y.id === x.id;
      });
    })
  );

export const getUser = (userId: number) => createSelector(getUsers, (state) => state.find((user) => user.id === userId));

export const getUsersInOffice = (office: string) => createSelector(getUsers, (state) => state.filter((user) => user.office === office));

export const getUsersLoading = createSelector(selectState, (state) => state.loading);

export const getCurrentUserId = createSelector(selectState, (state) => state.selectedUserId);

export const getUsersLoaded = createSelector(selectState, (state) => state.loaded);

export const getError = createSelector(selectState, (state) => state.error);
