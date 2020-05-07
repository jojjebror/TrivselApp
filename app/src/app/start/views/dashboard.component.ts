import { Component, OnInit } from '@angular/core';
import { HomeResource } from 'src/app/core/resources';
import { PodcastEpisode } from 'src/app/shared/models';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as fromPodcast from '../state/podcast';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  podcastFeed$: Observable<PodcastEpisode[]>;
  podcastFeed: PodcastEpisode[];
  episode: PodcastEpisode;

  constructor(
    private homeResource: HomeResource,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(new fromPodcast.LoadPodcastEpisodes());
    this.podcastFeed$ = this.store$.pipe(select(fromPodcast.getPodcastEpisodes));
    console.log(this.podcastFeed$)

    this.homeResource.getPodcastEpisodes().subscribe((res) => (this.podcastFeed = res));
  }

  playEpisode(episode: PodcastEpisode) {
    (document.getElementById('player') as HTMLAudioElement).src = episode.episodeUrl;
    (document.getElementById('player') as HTMLAudioElement).play();
    document.getElementById('audioPlayerDiv').style.display = "block";
    this.episode = episode;
  }
}
