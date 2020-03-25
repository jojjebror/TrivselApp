import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import * as fromEvents from '../../state/events';
import { Observable, Subscription } from 'rxjs';
import { Event } from 'src/app/shared/models';

//import * as eventActions from '../../state/events';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertify.service';

@Component({
  selector: 'ex-event-detail',
  templateUrl: './event-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  ev$: Observable<Event>;
  eventUsers: any;
  currentUserId: any;

  constructor(
    private store$: Store<AppState>,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.store$.select('session').subscribe(data => (this.currentUserId = data.user.id));
  }

  ngOnInit() {
    this.loadEvent();
  }

  private loadEvent(): void {
    this.subscription = this.route.params.subscribe(params => {
      const id = params['id'];
      this.store$.dispatch(new fromEvents.LoadEvent(+id));

      this.ev$ = this.store$.pipe(select(fromEvents.getCurrentEvent));
      this.store$.select(fromEvents.getCurrentUsers).subscribe(data => {
        this.eventUsers = data;
      });
    });
  }

  deleteEvent(id: number) {
    if (confirm('Vill du verkligen ta bort evenemanget?')) {
      this.store$.dispatch(new fromEvents.DeleteEvent(id));
      this.router.navigate(['/event']);
      this.alertify.message('Evenemanget togs bort');
    }
  }

  acceptInvite(id: number) {
    var data = [id, this.currentUserId];
    this.store$.dispatch(new fromEvents.AddUserEvent(data));

    this.loadEvent();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
