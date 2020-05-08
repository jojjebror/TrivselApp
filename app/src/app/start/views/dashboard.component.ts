import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromSession from '../../core/state/session';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { ActionTypes } from '../../core/state/session';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/shared/models';
import { AppState } from 'src/app/core/state';
import { AddDialogComponent, AddDialogModel } from 'src/app/shared/components/addDialog/addDialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import * as fromUsers from '../../user/state/users';

import { HomeResource } from 'src/app/core/resources';
import { PodcastEpisode } from 'src/app/shared/models';
import * as fromPodcast from '../state/podcast';

@Component({
  selector: 'ex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  user$: Observable<User>;
  podcastFeed$: Observable<PodcastEpisode[]>;
  podcastFeed: PodcastEpisode[];

  title: string;
  summary: string;
  episodeUrl: string;
  imageUrl: string;
  published: Date;
  showAudioPlayer = false;
  autoPlay = true;

  constructor(
    private store$: Store<AppState>,
    private actionsSubject$: ActionsSubject,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private homeResource: HomeResource
  ) {}

  ngOnInit(): void {
    //Works but gives error because lazy load
    this.store$.dispatch(new fromPodcast.LoadPodcastEpisodes());
    this.store$.pipe(select(fromPodcast.getPodcastEpisodes)).subscribe(res => this.podcastFeed = res);

    this.homeResource.getPodcastEpisodes().subscribe((res) => (this.podcastFeed = res));

    let currentUser: User;

    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.SetUserSuccess)).subscribe((action) => {
        this.user$ = this.store$.pipe(select(fromSession.selectUser));
        this.user$.subscribe((data) => (currentUser = data));

        if (currentUser.office === null) {
          this.addOfficeDialog(currentUser);
        }
      })
    );
  }

  toggleAudioPlayer() {
    this.showAudioPlayer = !this.showAudioPlayer;
  }

  playEpisode(episode: PodcastEpisode) {
    this.title = episode.title;
    this.summary = episode.summary;
    this.episodeUrl = episode.episodeUrl;    
    this.imageUrl = episode.imageUrl;
    this.published = episode.published;

    this.showAudioPlayer = true;
  }

  addOfficeDialog(user: User): void {
    var offices = ['Linköping', 'Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Örebro', 'Söderhamn', 'Borlänge', 'Helsingborg', 'Karlstad'];
    var office = user.office;
    const message = 'Välj det kontor du tillhör i listan nedan för att gå vidare till applikationen';
    const dialogData = new AddDialogModel('Välj ett kontor', message, offices, office);

    const dialogRef = this.dialog.open(AddDialogComponent, {
      maxWidth: '350px',
      data: dialogData,
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult == true) {
          this.addOffice(user.id, dialogData.office);
        }
      })
    );
  }

  addOffice(userId: number, newOffice: string) {
    var data = [userId, newOffice];
    this.store$.dispatch(new fromUsers.UpdateOffice(data));

    this.showSnackbarAddOffice(newOffice);
  }

  showSnackbarAddOffice(newOffice: string) {
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === fromUsers.ActionTypes.UPDATE_OFFICE_SUCCESS)).subscribe((action) => {
        this.snackBar.open('Ditt valda kontor: ' + newOffice, '', { duration: 3500 });
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
