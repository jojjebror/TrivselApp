import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';
import { adapter } from './events.adapter';
import { EventsState } from './events.model';
import { EventState } from '../event.model';
import { Statement } from '@angular/compiler';

const { selectAll } = adapter.getSelectors();

export const selectState = (state: AppState) => state.event.evs;

export const getEvents = createSelector(selectState, adapter.getSelectors().selectAll)

export const getEventsLoading = createSelector(selectState, state => state.loading);

export const getEventsLoaded = createSelector(selectState, state => state.loaded);

export const getError = createSelector(selectState, state => state.error);

export const getCurrentEventId = createSelector(selectState, state => state.selectedEventId)

export const getCurrentEvent = createSelector(selectState, getCurrentEventId, state => state.entities[state.selectedEventId])

