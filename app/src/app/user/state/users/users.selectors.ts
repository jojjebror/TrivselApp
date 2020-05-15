import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';
import { adapter } from './users.adapter';

const { selectAll } = adapter.getSelectors();

export const selectState = (state: AppState) => state.user.users;

export const getUsers = createSelector(selectState, selectAll);

export const getRelevantUsers = (userId: number) => createSelector(getUsers, (state) => state.filter((user) => user.id != userId));

export const getUsersLoading = createSelector(selectState, state => state.loading);

export const getUsersLoaded = createSelector(selectState, state => state.loaded);

export const getError = createSelector(selectState, state => state.error);

export const getCurrentUserId = createSelector(selectState, (state) => state.selectedUserId);



/* export const getEventsCreatedByUser = (userId: number) =>
  createSelector(getEvents, (events) => events.filter((event) => event.creatorId === userId)); */

/*   export const getInvitedParticipants = createSelector(selectState, getCurrentEventId, (state) => state.users);
 */