import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';

import { adapter } from './podcast.adapter';

const { selectAll } = adapter.getSelectors();

export const selectState = (state: AppState) => state.home.podcast;

export const getPodcast = createSelector(selectState, selectAll);

export const getPodcastLoading = createSelector(selectState, (state) => state.loading);

export const getPodcastLoaded = createSelector(selectState, (state) => state.loaded);

export const getError = createSelector(selectState, (state) => state.error);

export const getCurrentEpisodeId = createSelector(selectState, (state) => state.selectedEpisodeId);
