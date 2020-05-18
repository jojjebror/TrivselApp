import { Action } from '@ngrx/store';
import { PodcastEpisode } from '../../../shared/models';
import { LoadingAction } from '../../../core/state/loading';


export enum ActionTypes {
  LOAD_PODCAST = '[Podcast view] Load Podcast',
  LOAD_PODCAST_SUCCESS = '[API: /home/podcast] Load Podcast success',
  LOAD_PODCAST_ERROR = '[API: /home/podcast] Load Podcast error',
}

/*--------------LoadAllPodcast--------------*/

export class LoadPodcast implements Action {
  readonly type = ActionTypes.LOAD_PODCAST;
  fxLoading = { add: ActionTypes.LOAD_PODCAST };

}

export class LoadPodcastSuccess implements Action {
  readonly type = ActionTypes.LOAD_PODCAST_SUCCESS;
  fxLoading = { remove: ActionTypes.LOAD_PODCAST };

  constructor(public payload: PodcastEpisode[]) {}
}

export class LoadPodcastError implements Action {
  readonly type = ActionTypes.LOAD_PODCAST_ERROR;

  constructor(public payload: string) {}
}

export type Actions = LoadPodcast | LoadPodcastSuccess | LoadPodcastError;