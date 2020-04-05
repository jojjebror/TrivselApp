import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Event, User } from '../../../shared/models';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as fromEvents from '../../state/events';
import * as fromUsers from '../../../user/state/users';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { Router } from '@angular/router';
import * as fromSession from '../../../core/state/session';

@Component({
  selector: 'ex-event-list',
  templateUrl: './event-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  evs$: Observable<Event[]>;
  userId: number;

  createdEvents: Event[];
  invitedEvents: Event[];
  attendedEvents: Event[];

  displayedColumnsCreated = ['title', 'location', 'date', 'actions'];
  displayedColumnsInvited = ['title2', 'location2', 'date2', 'invited2', 'actions2'];
  displayedColumnsAttended = ['title3', 'location3', 'date3', 'invited3', 'actions3'];

  constructor(private store$: Store<AppState>, private alertify: AlertifyService, public router: Router) {
    this.store$.select(fromSession.selectUserId).subscribe((response) => (this.userId = response));
    console.log('SelectUserId: ' + this.userId);
  }

  ngOnInit() {
    this.store$.select(fromSession.selectUser).subscribe((response) => (this.userId = response.id));

    this.loadEvents();
  }

  private loadEvents() {
    this.store$.dispatch(new fromUsers.GetCurrentUser(this.userId));
    this.store$.dispatch(new fromEvents.LoadEvents());

    //All events
    this.evs$ = this.store$.pipe(select(fromEvents.getEvents));

    //Events created by logged in user
    this.store$.pipe(select(fromEvents.getEventsCreatedByUser(this.userId))).subscribe((response) => {
      this.createdEvents = response;
    });

    //Events that the user has been invited to
    this.store$.pipe(select(fromUsers.getInvitedEvents)).subscribe((response) => {
      this.invitedEvents = response;
    });

    //Events that the user already have attended to
    this.store$.pipe(select(fromUsers.getAttendedEvents)).subscribe((response) => {
      this.attendedEvents = response;
    });
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

  UpdateParticpantsToEvent(id: number, answer: string) {
    var data = [id, this.userId, answer];
    this.store$.dispatch(new fromEvents.AddEventParticipant(data));

    if (answer == 'true') {
      this.alertify.success('Ditt svar är registrerat');
    }
  }
}
