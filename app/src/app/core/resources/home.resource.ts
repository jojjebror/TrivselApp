import { ApiResource } from './api.resource';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PodcastEpisode } from '../../shared/models';

@Injectable()
export class HomeResource extends ApiResource {
  constructor(http: HttpClient) {
    super(http);
  }

  getPodcastEpisodes(): Observable<PodcastEpisode[]> {
    return this.get('home');
  }
}