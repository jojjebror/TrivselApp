import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import * as fromEvents from '../../state/events';
import { Observable, Subscription } from 'rxjs';
import { Event } from 'src/app/shared/models';

import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertify.service';

import * as fromSession from '../../../core/state/session';

@Component({
  selector: 'ex-event-detail',
  templateUrl: './event-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  eventId: any;
  ev$: Observable<Event>;
  participantsAccepted$: any;
  invitedParticipants$: any;
  userId: number;
  imageUrl: string;

  constructor(private store$: Store<AppState>, private alertify: AlertifyService, private activatedRoute: ActivatedRoute) {
    this.store$.select(fromSession.selectUser).subscribe(user => (this.userId = user.id));
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.eventId = params['id'];
    });
    this.loadEvent();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadEvent() {
    this.store$.dispatch(new fromEvents.LoadEvent(+this.eventId));
    this.ev$ = this.store$.pipe(select(fromEvents.getCurrentEvent));

    this.participantsAccepted$ = this.store$.pipe(select(fromEvents.getAcceptedUsers));
    this.invitedParticipants$ = this.store$.pipe(select(fromEvents.getInvitedUsers));
  }

  deleteEvent(id: number) {
    if (confirm('Vill du verkligen ta bort evenemanget?')) {
      this.store$.dispatch(new fromEvents.DeleteEvent(id));
      this.alertify.message('Evenemanget togs bort');
    }
  }

  UpdateParticpantsToEvent(id: number, answer: string) {
    var data = [id, this.userId, answer];
    this.store$.dispatch(new fromEvents.AddEventParticipant(data));
  }
}
