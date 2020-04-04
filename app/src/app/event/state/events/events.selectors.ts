import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';
import { adapter } from './events.adapter';


const { selectAll } = adapter.getSelectors();

export const selectState = (state: AppState) => state.event.evs;

export const getEvents = createSelector(selectState, selectAll);

export const getEventsCreatedByUser = createSelector(getEvents, (events) => events.filter((event) => event.creatorId === 1 ));

export const getEventsLoading = createSelector(selectState, state => state.loading);

export const getEventsLoaded = createSelector(selectState, state => state.loaded);

export const getError = createSelector(selectState, state => state.error);

export const getCurrentEventId = createSelector(selectState, state => state.selectedEventId);

export const getInvitedParticipants = createSelector(selectState, getCurrentEventId, state => state.users);

export const getAcceptedParticipants = createSelector(selectState, getInvitedParticipants, state =>
  state.users.filter(val => val.accepted == true)
);


/*  export const getDeclinedParticipants = createSelector(selectState, getInvitedParticipants, state =>
  state.users.filter(val => val.accepted == false)
);  */

const { selectIds, selectEntities } = adapter.getSelectors(selectState);

export const getCurrentEvent = createSelector(selectEntities, getCurrentEventId, (entities, currentEventId) => {
  return entities[currentEventId];
});
