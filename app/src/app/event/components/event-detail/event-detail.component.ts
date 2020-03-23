import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import * as fromEvent from '../../state/events';
import { Observable, Subscription } from 'rxjs';
import { Event, User } from 'src/app/shared/models';

import * as eventActions from '../../state/events';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
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

  constructor(private store$: Store<AppState>, private alertify: AlertifyService, private route: ActivatedRoute, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this.ev$ = this.store$.select(fromEvent.getCurrentEvent);

    this.subscription = this.route.params.subscribe(params => {
      const id = params['id'];
      this.store$.dispatch(new eventActions.LoadEvent(+id));
    });

    console.log(this.ev$);
  }

  deleteEvent(id: number) {
    console.log(id);
    if (confirm('Vill du verkligen ta bort evenemanget?')) {
      this.store$.dispatch(new eventActions.DeleteEvent(id));
             this.router.navigate(['/event']);
             this.alertify.message('Evenemanget togs bort');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
