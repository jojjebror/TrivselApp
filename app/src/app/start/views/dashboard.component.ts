import { Component, OnInit } from '@angular/core';
import { HomeResource } from 'src/app/core/resources';
import { PodcastEpisode } from 'src/app/shared/models';

@Component({
  selector: 'ex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  podcastFeed: PodcastEpisode[];

  constructor(private homeResource: HomeResource) {}

  ngOnInit(): void {
    this.homeResource.getPodcastEpisodes().subscribe((res) => (this.podcastFeed = res));
  }

  playEpisode(episode: PodcastEpisode) {
    (document.getElementById('player') as HTMLAudioElement).src = episode.episodeUrl;
    (document.getElementById('player') as HTMLAudioElement).play();
  }
}
