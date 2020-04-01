import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Event } from '../../../shared/models';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as fromEvents from '../../state/events';

@Component({
  selector: 'ex-event-list',
  templateUrl: './event-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  evs$: Observable<Event[]>;

  constructor(private store$: Store<AppState>) {}

  ngOnInit() {
    this.loadEvents();
  }

  private loadEvents() {
    this.store$.dispatch(new fromEvents.LoadEvents());
    this.evs$ = this.store$.pipe(select(fromEvents.getEvents));
  }
}
