import { PodcastState } from './podcast/podcast.model';
import { OfficesState } from './offices/offices.model';

export class HomeState {
  episodes: PodcastState;
  offices: OfficesState;
}
