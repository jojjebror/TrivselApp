import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Event } from '../../../shared/models';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as eventActions from '../../state/events';
import * as fromEvent from '../../state/events/events.selectors';

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
    this.InitializeEvents();
  }

  private InitializeEvents(): void {
    this.store$.dispatch(new eventActions.LoadEvents());
    this.evs$ = this.store$.pipe(select(fromEvent.getEvents));
  }
}
