import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { HomeResource } from '../../../core/resources';
import * as podcastActions from './podcast.actions';
import { PodcastEpisode } from 'src/app/shared/models';

@Injectable()
export class PodcastEffects {
  constructor(
    private actions$: Actions,
    private homeResource: HomeResource,
    private router: Router
  ) {}

  @Effect()
  loadPodcast$: Observable<Action> = this.actions$.pipe(
    ofType(podcastActions.ActionTypes.LOAD_PODCAST),
    switchMap(() => {
      return this.homeResource.loadPodcast().pipe(
        map((episode: PodcastEpisode[]) => new podcastActions.LoadPodcastSuccess(episode)),
        catchError((err) => of(new podcastActions.LoadPodcastError(err)))
      );
    })
  );
}