import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Event } from '../../../shared/models';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as fromEvents from '../../state/events';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import * as fromSession from '../../../core/state/session';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ex-event-list',
  templateUrl: './event-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  evs$: Observable<Event[]>;
  userId: number;

  createdEvents = new MatTableDataSource<Event>();
  invitedEvents = new MatTableDataSource<Event>();
  attendedEvents = new MatTableDataSource<Event>();

  displayedColumnsCreated = ['title', 'location', 'date', 'actions'];
  displayedColumnsInvited = ['title2', 'location2', 'date2', 'invited2', 'actions2'];
  displayedColumnsAttended = ['title3', 'location3', 'date3', 'invited3', 'actions3'];

  constructor(private store$: Store<AppState>, private alertify: AlertifyService) {
    this.subscription.add(this.store$.select(fromSession.selectUserId).subscribe((response) => (this.userId = response)));
  }

  ngOnInit() {
    this.loadEvents();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadEvents() {
    this.subscription.add(this.store$.select(fromSession.selectUserId).subscribe((response) => (this.userId = response)));

    this.store$.dispatch(new fromEvents.GetCurrentUserEvent(this.userId));
    this.store$.dispatch(new fromEvents.LoadEvents());

    //All events
    this.evs$ = this.store$.pipe(select(fromEvents.getEvents));

    this.subscription.add(
      this.store$.pipe(select(fromEvents.getEventsCreatedByUser(this.userId))).subscribe((data: Event[]) => {
        this.createdEvents.data = data;
      })
    );

    //Events that the user has been invited to
    this.subscription.add(
      this.store$.pipe(select(fromEvents.getInvitedEvents)).subscribe((data: Event[]) => {
        this.invitedEvents.data = data;
      })
    );

    //Events that the user already have attended to
    this.subscription.add(
      this.store$.pipe(select(fromEvents.getAttendedEvents)).subscribe((data: Event[]) => {
        this.attendedEvents.data = data;
      })
    );
  }

  deleteEvent(id: number) {
    if (confirm('Vill du verkligen ta bort evenemanget?')) {
      this.store$.dispatch(new fromEvents.DeleteEvent(id));
      this.alertify.success('Evenemang borttaget');
    }
  }

  editEvent(id: number) {
    this.store$.dispatch(new fromEvents.LoadEditEvent(id));
  }

  updateParticpantsToEvent(id: number, answer: string) {
    var data = [id, this.userId, answer];
    this.store$.dispatch(new fromEvents.UpdateUserParticipant(data));

    this.refreshData();

    if (answer == 'Accepted') {
      this.alertify.success('Ditt svar är registrerat');
    } else {
      this.alertify.success('Du är borttagen från evenemanget');
    }
  }

  refreshData() {
    //Events created by logged in user
    this.subscription.add(
      this.store$.pipe(select(fromEvents.getEventsCreatedByUser(this.userId))).subscribe((data: Event[]) => {
        this.createdEvents.data = data;
        console.log('UpdateMethodCreatedEvents' + this.createdEvents.data);
      })
    );

    //Events that the user has been invited to
    this.subscription.add(
      this.store$.pipe(select(fromEvents.getInvitedEvents)).subscribe((data: Event[]) => {
        this.invitedEvents.data = data;
        console.log('UpdateMethodInvitedEvents' + this.invitedEvents.data);
      })
    );

    //Events that the user already have attended to
    this.subscription.add(
      this.store$.pipe(select(fromEvents.getAttendedEvents)).subscribe((data: Event[]) => {
        this.attendedEvents.data = data;
        console.log('UpdateMethodAttendedEvents' + this.attendedEvents.data);
      })
    );
  }
}
