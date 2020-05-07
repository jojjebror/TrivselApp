import { Action } from '@ngrx/store';
import { PodcastEpisode } from '../../../shared/models';
import { Update } from '@ngrx/entity';

export enum ActionTypes {
  LOAD_PODCAST_EPISODES = '[Podcast view] Load Podcast Episodes',
  LOAD_PODCAST_EPISODES_SUCCESS = '[API: /home/podcast] Load Podcast Episodes success',
  LOAD_PODCAST_EPISODES_ERROR = '[API: /home/podcast] Load Podcast Episodes error',
}

/*--------------LoadAllPodcastEpisodes--------------*/

export class LoadPodcastEpisodes implements Action {
  readonly type = ActionTypes.LOAD_PODCAST_EPISODES;
}

export class LoadPodcastEpisodesSuccess implements Action {
  readonly type = ActionTypes.LOAD_PODCAST_EPISODES_SUCCESS;

  constructor(public payload: PodcastEpisode[]) {}
}

export class LoadPodcastEpisodesError implements Action {
  readonly type = ActionTypes.LOAD_PODCAST_EPISODES_ERROR;

  constructor(public payload: string) {}
}

export type Actions = LoadPodcastEpisodes | LoadPodcastEpisodesSuccess | LoadPodcastEpisodesError;