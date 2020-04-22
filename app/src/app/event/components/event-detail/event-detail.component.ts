import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import * as fromEvents from '../../state/events';
import { Observable, Subscription } from 'rxjs';
import { Event, User, Post } from 'src/app/shared/models';

import { ActivatedRoute } from '@angular/router';
import * as fromSession from '../../../core/state/session';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'ex-event-detail',
  templateUrl: './event-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  postForm: FormGroup;
  post: Post;
  eventId: any;
  userId: number;
  ev$: Observable<Event>;
  posts$: Observable<Post[]>;
  attendedParticipants$: Observable<User[]>;
  invitedParticipants$: Observable<User[]>;
  declinedParticipants$: Observable<User[]>;

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
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

    if (answer == 'accepted') {
      this.snackBar.open('Du är tillagd i evenemanget', '', { duration: 2500 });
    }
    if (answer == 'declined') {
      this.snackBar.open('Du är borttagen ur evenemanget', '', { duration: 2500 });
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

      //fix for problem reloading after 1 post...
      this.postForm.get('creatorId').setValue(this.userId);
      this.postForm.get('eventId').setValue(this.eventId);

      this.post = Object.assign({}, this.postForm.value);
      this.store$.dispatch(new fromEvents.AddPostToEvent(this.post));

      this.snackBar.open('Kommentar postad', '', { duration: 2500 });
      this.postForm.reset();
    }
  }

  deletePost(id: number, postId: number) {
    var data = [id, postId];
    this.store$.dispatch(new fromEvents.DeletePost(data));
    this.snackBar.open('Kommentar borttagen', '', { duration: 2500 });
  }

  getDayOfWeek(date: Date) {
    const dayOfWeek = new Date(date).getDay();
    console.log(dayOfWeek);
    return isNaN(dayOfWeek) ? null : ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'][dayOfWeek];
  }

  checkDates(startdate: Date, enddate: Date) {
    let startD = new Date(startdate);
    let endD = new Date(enddate);

    if (startD.toDateString() === endD.toDateString()) {
      return true;
    } else {
      return false;
    }
  }

  checkEndTime(enddate: Date) {
    let endD = new Date(enddate);
    console.log('enddate:' + endD.getHours() + ', min' + endD.getMinutes());

    if (endD.getHours() != 23 && endD.getMinutes() != 59) {
      return true;
    } else {
      return false;
    }
  }
}
