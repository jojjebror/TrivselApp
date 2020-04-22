import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Event } from '../../../shared/models';
import { Observable, Subscription, Subject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as fromEvents from '../../state/events';
import * as fromSession from '../../../core/state/session';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, PageEvent } from '@angular/material';

@Component({
  selector: 'ex-event-list',
  templateUrl: './event-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscription = new Subscription();
  evs$: Observable<Event[]>;
  userId: number;

  createdEvents = new MatTableDataSource<Event>();
  invitedEvents = new MatTableDataSource<Event>();
  attendedEvents = new MatTableDataSource<Event>();
  allEvents = new MatTableDataSource<Event>();

  displayedColumnsCreated = ['title', 'location', 'date', 'actions'];
  displayedColumnsInvited = ['title2', 'location2', 'date2', 'invited2', 'actions2'];
  displayedColumnsAttended = ['title3', 'location3', 'date3', 'invited3', 'actions3'];

  constructor(private store$: Store<AppState>, private snackBar: MatSnackBar, private changeDetectorRef: ChangeDetectorRef) {
    this.subscription.add(this.store$.select(fromSession.selectUserId).subscribe((response) => (this.userId = response)));
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.loadEvents();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.allEvents) {
      this.allEvents.disconnect();
    }
  }

  private loadEvents() {
    this.subscription.add(this.store$.select(fromSession.selectUserId).subscribe((response) => (this.userId = response)));

    this.store$.dispatch(new fromEvents.GetCurrentUserEvent(this.userId));
    this.store$.dispatch(new fromEvents.LoadEvents());

    //All events
    //save this
    //this.evs$ = this.store$.pipe(select(fromEvents.getEvents));

    this.store$.pipe(select(fromEvents.getEvents)).subscribe((data: Event[]) => {
      this.allEvents.data = data;
    });

    this.allEvents.paginator = this.paginator;
    this.evs$ = this.allEvents.connect();
    this.createdEvents.sort = this.sort;

    //Events that the user have created
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
      this.snackBar.open('Evenemang borttaget', '', { duration: 2500 });
    }
  }

  editEvent(id: number) {
    this.store$.dispatch(new fromEvents.LoadEditEvent(id));
  }

  updateParticpantsToEvent(id: number, answer: string) {
    var data = [id, this.userId, answer];
    this.store$.dispatch(new fromEvents.UpdateUserParticipant(data));

    this.refreshData();

    if (answer == 'accepted') {
      this.snackBar.open('Du är tillagd i evenemanget', '', { duration: 2500 });
    }
    if (answer == 'declined') {
      this.snackBar.open('Du är borttagen från evenemanget', '', { duration: 2500 });
    }
  }

  refreshData() {
    //Events created by logged in user
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

  doFilter(filterValue: string, keyword: string) {
    if(keyword === 'createdEvents') {
      this.createdEvents.filter = filterValue.trim().toLocaleLowerCase();
    }
    else {
      this.allEvents.filter = filterValue.trim().toLocaleLowerCase();
    }
    
  }
}
