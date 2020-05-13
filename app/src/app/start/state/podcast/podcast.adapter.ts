import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { PodcastEpisode } from '../../../shared/models';

export const adapter: EntityAdapter<PodcastEpisode> = createEntityAdapter<PodcastEpisode>({
  selectId: (episode: PodcastEpisode) => episode.id
});
