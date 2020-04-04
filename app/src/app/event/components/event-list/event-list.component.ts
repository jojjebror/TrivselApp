import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Event } from '../../../shared/models';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as fromEvents from '../../state/events';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { Router } from '@angular/router';
//import * as fromSession from '../../../core/state/session';

@Component({
  selector: 'ex-event-list',
  templateUrl: './event-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  evs$: Observable<Event[]>;
  createdEventByUser$: Observable<Event[]>;
  userId: number;
  events: any[];
  displayedColumns = ['title', 'location', 'date', 'actions'];

  constructor(private store$: Store<AppState>, private alertify: AlertifyService, public router: Router) {
    //this.store$.select(fromSession.selectUser).subscribe((user) => (this.userId = user.id));
  }

  ngOnInit() {
    this.loadEvents();
  }

  private loadEvents() {
    this.store$.dispatch(new fromEvents.LoadEvents());
    this.evs$ = this.store$.pipe(select(fromEvents.getEvents));
    this.createdEventByUser$ = this.store$.pipe(select(fromEvents.getEventsCreatedByUser));

    this.createdEventByUser$.subscribe((events) => {
      this.events = events;
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
    //this.router.navigate(['/event/edit', id]);
  }
}
