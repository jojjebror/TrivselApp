import { ActionReducerMap } from '@ngrx/store';

import * as fromPodcast from './podcast';
import * as fromOffices from './offices';

import { HomeState } from './home.model';

export { HomeState } from './home.model';

export const effects = [fromPodcast.PodcastEffects, fromOffices.OfficesEffects];

export const reducers: ActionReducerMap<HomeState> = {
  episodes: fromPodcast.reducer,
  offices: fromOffices.reducer
};
