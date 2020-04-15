import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import * as fromEvents from '../../state/events';
import { Observable, Subscription } from 'rxjs';
import { Event, User, Post } from 'src/app/shared/models';

import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertify.service';

import * as fromSession from '../../../core/state/session';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ex-event-detail',
  templateUrl: './event-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  postForm: FormGroup;
  post: Post;
  eventId: any;
  ev$: Observable<Event>;
  posts$: Observable<Post[]>;
  attendedParticipants$: Observable<User[]>;
  invitedParticipants$: Observable<User[]>;
  declinedParticipants$: Observable<User[]>;
  userId: number;

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscription.add(this.store$.select(fromSession.selectUser).subscribe((user) => (this.userId = user.id)));
  }

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.params.subscribe((params) => {
        this.eventId = params['id'];
      })
    );
    this.loadEvent();
    this.createPostForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadEvent() {
    this.store$.dispatch(new fromEvents.LoadEvent(+this.eventId));
    this.ev$ = this.store$.pipe(select(fromEvents.getCurrentEvent));

    this.posts$ = this.store$.pipe(select(fromEvents.getEventPosts));

    this.attendedParticipants$ = this.store$.pipe(select(fromEvents.getAttendedParticipants));
    this.invitedParticipants$ = this.store$.pipe(select(fromEvents.getInvitedParticipants));
    this.declinedParticipants$ = this.store$.pipe(select(fromEvents.getDeclinedParticipants));
  }

  updateParticpantsToEvent(id: number, answer: string) {
    var data = [id, this.userId, answer];
    this.store$.dispatch(new fromEvents.AddEventParticipant(data));

    if (answer == 'true') {
      this.alertify.success('Ditt svar är registrerat');
    }
  }

  checkAttendedUsers() {
    let attendedUsers: User[];
    this.attendedParticipants$.subscribe((data) => (attendedUsers = data));

    if (attendedUsers.some((u) => u.id === this.userId)) {
      return true;
    } else {
      return false;
    }
  }

  checkDeclinedUsers() {
    let declinedUsers: User[];
    this.declinedParticipants$.subscribe((data) => (declinedUsers = data));

    if (declinedUsers.some((u) => u.id === this.userId)) {
      return true;
    } else {
      return false;
    }
  }

  countParticipants(users: Observable<User[]>) {
    let countParticipants: User[];
    users.subscribe((data) => (countParticipants = data));
    return countParticipants.length;
  }

  createPostForm() {
    this.postForm = this.fb.group({
      content: ['', Validators.required],
      creatorId: [this.userId],
      eventId: [this.eventId],
      created: [''],
    });
  }

  createPost() {
    if (this.postForm.valid) {
      this.postForm.get('created').setValue(new Date());
      this.post = Object.assign({}, this.postForm.value);
      this.store$.dispatch(new fromEvents.AddPostToEvent(this.post));

      this.alertify.success('Postat');
      this.postForm.reset();
    }
  }

  /* checkDates(startdate: Date, enddate: Date) {
    if(startdate.getUTCDate != enddate.getUTCDate) {
      return true;
    }
    else{
      return false;
    }
  } */
}
