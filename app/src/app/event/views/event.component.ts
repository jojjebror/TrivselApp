import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/state';
import { Event } from '../../shared/models';

import * as fromEvents from '../state/events';

@Component({
  selector: 'ex-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
/*   evs$: Observable<Event[]>;*/

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    /* this.initializeEvents(); */
/*     this.store$.dispatch(new fromEvents.Load());
 */  }

  /* createEvent(ev: Event): void {

  }

  private initializeEvents(): void {
    this.store$.dispatch(new fromEvents.Load());
    this.evs$ = this.store$.select(fromEvents.selectEvents);
  } */
}
