import { ActionReducerMap } from '@ngrx/store';

import * as fromPodcast from './podcast';

import { HomeState } from './podcast.model';

export { HomeState } from './podcast.model';

export const effects = [fromPodcast.PodcastEffects];

export const reducers: ActionReducerMap<HomeState> = {
  episodes: fromPodcast.reducer,
};
