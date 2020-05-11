import { EntityState } from '@ngrx/entity';

import { PodcastEpisode } from '../../../shared/models';

export interface PodcastState extends EntityState<PodcastEpisode> {
  /* selectedPodcastEpisodeId: string | null; */
  selectedPodcastEpisodeId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
}
