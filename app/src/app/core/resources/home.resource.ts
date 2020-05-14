import { ApiResource } from './api.resource';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PodcastEpisode, Office } from '../../shared/models';

@Injectable()
export class HomeResource extends ApiResource {
  constructor(http: HttpClient) {
    super(http);
  }

  loadPodcast(): Observable<PodcastEpisode[]> {
    return this.get('home/podcast');
  }

  loadOffices(): Observable<Office[]> {
    return this.get('home/offices');
  }
}
