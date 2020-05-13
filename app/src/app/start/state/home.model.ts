import { PodcastState } from './podcast/podcast.model';
import { OfficesState } from './offices/offices.model';

export class HomeState {
  podcast: PodcastState;
  offices: OfficesState;
}
