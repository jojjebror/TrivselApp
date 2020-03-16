import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';
import { adapter } from './events.adapter';
import { EventsState } from './events.model';

const { selectAll } = adapter.getSelectors();

export const selectState = (state: AppState) => state.event.evs;
export const selectLoading = createSelector(selectState, state => state.loading);
export const selectEvents = createSelector(selectState, selectAll);

export const getEventId = createSelector(
    selectState, (state: EventsState) => state.selectedEventId
);

//state => state.event.evs.selectedEventId