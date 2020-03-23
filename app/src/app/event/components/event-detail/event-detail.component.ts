import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import * as fromEvent from '../../state/events';
import { Observable, Subscription } from 'rxjs';
import { Event } from 'src/app/shared/models';

import * as eventActions from '../../state/events';
import { ActivatedRoute } from '@angular/router';
import { EventResource } from 'src/app/core/resources';

@Component({
  selector: 'ex-event-detail',
  templateUrl: './event-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  ev$: Observable<Event>;
  currentUserId: any;
  subscription: Subscription;

  constructor(private store$: Store<AppState>, private route: ActivatedRoute, private eventResource: EventResource) {
    this.store$.select('session').subscribe(data => (this.currentUserId = data.user.id));
  }

  ngOnInit() {
    this.loadEvent();
  }

  private loadEvent(): void {
    this.subscription = this.route.params.subscribe(params => {
      const id = params['id'];
      this.store$.dispatch(new eventActions.LoadEvent(+id));
    });

    this.ev$ = this.store$.pipe(select(fromEvent.getCurrentEvent));
  }

  acceptInvite() {
    
  }
}
