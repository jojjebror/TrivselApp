import { Component, OnInit } from '@angular/core';

import { AppState } from 'src/app/core/state';
import { Store } from '@ngrx/store';
import * as fromEvents from '../../state/events';
import { Observable, fromEvent } from 'rxjs';
import { Event } from 'src/app/shared/models';

@Component({
  selector: 'ex-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  
  constructor(private store$: Store<AppState>) {}

  const ev$: Observable<Event> = this.store$.select(fromEvents.getEventId);

  ngOnInit() {}
}
