import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';

import { adapter } from './podcast.adapter';

const { selectAll } = adapter.getSelectors();

export const selectState = (state: AppState) => state.home.episodes;

export const getPodcastEpisodes = createSelector(selectState, selectAll);

export const getPodcastEpisodesLoading = createSelector(selectState, (state) => state.loading);

export const getPodcastEpisodesLoaded = createSelector(selectState, (state) => state.loaded);

export const getError = createSelector(selectState, (state) => state.error);

export const getCurrentPodcastEpisodeId = createSelector(selectState, (state) => state.selectedPodcastEpisodeId);
