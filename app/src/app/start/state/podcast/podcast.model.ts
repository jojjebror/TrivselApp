import { EntityState } from '@ngrx/entity';

import { PodcastEpisode } from '../../../shared/models';

export interface PodcastState extends EntityState<PodcastEpisode> {
  /* selectedPodcastEpisodeId: string | null; */
  selectedEpisodeId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
}
