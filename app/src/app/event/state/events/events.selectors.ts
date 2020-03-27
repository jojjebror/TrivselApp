import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';
import { adapter } from './events.adapter';

const { selectAll } = adapter.getSelectors();

export const selectState = (state: AppState) => state.event.evs;

export const getEvents = createSelector(selectState, selectAll )

export const getEventsLoading = createSelector(selectState, state => state.loading);

export const getEventsLoaded = createSelector(selectState, state => state.loaded);

export const getError = createSelector(selectState, state => state.error);

export const getCurrentEventId = createSelector(selectState, state => state.selectedEventId);

/* export const getCurrentEvent2 = createSelector(selectState, getCurrentEventId, state => state.entities[state.selectedEventId]); */

export const getCurrentUsers = createSelector(selectState, getCurrentEventId, state => state.users);


const { selectIds, selectEntities } = adapter.getSelectors(selectState);

export const getCurrentEvent = createSelector(
  selectEntities, getCurrentEventId, (entities, currentEventId) => {
    return entities[currentEventId];
});