import { PodcastState } from './podcast.model';

import { adapter } from './podcast.adapter';
import * as podcastActions from './podcast.actions';

let initialState = adapter.getInitialState({
  selectedPodcastEpisodeId: null,
  loading: false,
  loaded: false,
  error: null,
});

export function reducer(state: PodcastState = initialState, action: podcastActions.Actions): PodcastState {
  switch (action.type) {
    case podcastActions.ActionTypes.LOAD_PODCAST_EPISODES: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case podcastActions.ActionTypes.LOAD_PODCAST_EPISODES_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,
        selectedPodcastEpisodeId: null,
      });
    }

    case podcastActions.ActionTypes.LOAD_PODCAST_EPISODES_ERROR: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }
  }
}
