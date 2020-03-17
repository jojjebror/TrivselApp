import { Component, OnInit } from '@angular/core';

import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import * as fromEvent from '../../state/events';
import { Observable } from 'rxjs';
import { Event } from 'src/app/shared/models';

import * as eventActions from '../../state/events';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ex-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  ev$: Observable<Event>;

  constructor(private store$: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.LoadEvent();
  }

  private LoadEvent(): void {
    this.store$.dispatch(new eventActions.LoadEvent(this.getClickedId()));
    this.ev$ = this.store$.pipe(select(fromEvent.getCurrentEvent));
  }

  private getClickedId() {
    var id = Number(this.route.snapshot.paramMap.get('id'));
    return id;
  }
}
