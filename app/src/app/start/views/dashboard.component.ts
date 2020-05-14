import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import * as fromSession from '../../core/state/session';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { ActionTypes } from '../../core/state/session';
import { ActionTypesO } from '../state/offices'
import { Observable, Subscription } from 'rxjs';
import { User, Office } from 'src/app/shared/models';
import { AppState } from 'src/app/core/state';
import { AddDialogComponent, AddDialogModel } from 'src/app/shared/components/addDialog/addDialog.component';
import { getLoadingData } from '../../core/state/loading';
import { MatDialog, MatSnackBar } from '@angular/material';
import * as fromUsers from '../../user/state/users';

import { PodcastEpisode } from 'src/app/shared/models';
import * as fromPodcast from '../state/podcast';
import * as fromOffices from '../state/offices';

@Component({
  selector: 'ex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  loadings$ = this.store$.pipe(select(getLoadingData));
  user$: Observable<User>;
  podcastFeed$: Observable<PodcastEpisode[]>;
  offices$: Observable<Office[]>;
  userOffice$: Observable<Office>;

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
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPodcast();

    let currentUser: User;

    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.SetUserSuccess)).subscribe((action) => {
        this.user$ = this.store$.pipe(select(fromSession.selectUser));
        this.user$.subscribe(data => currentUser = data);

        if (currentUser.office === null) {
            this.loadOffices();
            this.subscription.add(this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypesO.LOAD_OFFICES_SUCCESS)).subscribe((action) => {
              this.addOfficeDialog(currentUser);
          }));
        }
      })
    );
  }

  loadOffices() {
    this.store$.dispatch(new fromOffices.LoadOffices());
    this.offices$ = this.store$.pipe(select(fromOffices.getOffices));
  }

  loadPodcast() {
    this.store$.dispatch(new fromPodcast.LoadPodcast());
    this.podcastFeed$ = this.store$.pipe(select(fromPodcast.getPodcast));
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
    let office: Office;
    let offices: Office[];

    this.subscription.add(this.offices$.subscribe((data) => (offices = data)));

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

  addOffice(userId: number, newOffice: Office) {
    let data = [userId, newOffice.name];
    this.store$.dispatch(new fromUsers.UpdateOffice(data));

    this.showSnackbarAddOffice(newOffice.name);
  }

  showSnackbarAddOffice(newOffice: string) {
    this.subscription.add(
      this.actionsSubject$
        .pipe(filter((action: any) => action.type === fromUsers.ActionTypes.UPDATE_OFFICE_SUCCESS))
        .subscribe((action) => {
          this.snackBar.open('Ditt valda kontor: ' + newOffice, '', { duration: 3500 });
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
