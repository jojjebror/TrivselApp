import { PodcastState } from './podcast.model';

import { adapter } from './podcast.adapter';
import * as podcastActions from './podcast.actions';

let initialState = adapter.getInitialState({
  selectedEpisodeId: null,
  loading: false,
  loaded: false,
  error: null,
});

export function reducer(state: PodcastState = initialState, action: podcastActions.Actions): PodcastState {
  switch (action.type) {
    case podcastActions.ActionTypes.LOAD_PODCAST: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case podcastActions.ActionTypes.LOAD_PODCAST_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,
        selectedEpisodeId: null,
      });
    }

    case podcastActions.ActionTypes.LOAD_PODCAST_ERROR: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}
