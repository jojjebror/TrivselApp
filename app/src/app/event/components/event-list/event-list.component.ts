import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Event } from '../../../shared/models';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as fromEvents from '../../state/events';

@Component({
  selector: 'ex-event-list',
  templateUrl: './event-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  /* @Input() evs: Event[];

  constructor() { } */

  evs$: Observable<Event[]>;

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    /* this.initializeEvents(); */
    this.evs$ = this.store$.select(fromEvents.selectEvents);
  }

  /* private initializeEvents(): void {
    this.store$.dispatch(new fromEvents.Load());
    this.evs$ = this.store$.select(fromEvents.selectEvents);
  } */
}
