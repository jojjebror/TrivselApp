import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { AppState } from 'src/app/core/state';
import { Store, select, ActionsSubject } from '@ngrx/store';
import * as fromEvents from '../../state/events';
import { Observable, Subscription } from 'rxjs';
import { Event, User, Post } from 'src/app/shared/models';

import { ActivatedRoute, Router } from '@angular/router';
import * as fromSession from '../../../core/state/session';
import { getLoadingData, getLoadingByKey } from '../../../core/state/loading';
import { ActionTypes } from '../../state/events';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthenticationService } from 'src/app/core/services';
import { filter } from 'rxjs/operators';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/components/confirmDialog/confirmDialog.component';
import {
  ParticipantsDialogModel,
  ParticipantsDialogComponent,
} from 'src/app/shared/components/participantsDialog/participantsDialog.component';

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
  loadings$ = this.store$.pipe(select(getLoadingData));
  eventId: any;
  userId: number;
  ev$: Observable<Event>;
  posts$: Observable<Post[]>;
  attendedParticipants$: Observable<User[]>;
  invitedParticipants$: Observable<User[]>;
  declinedParticipants$: Observable<User[]>;
  index = 0;
  selectedPage: number = 0;
  selectedTab: number = 0;

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public authService: AuthenticationService,
    private actionsSubject$: ActionsSubject,
    public dialog: MatDialog
  ) {
    this.subscription.add(
      authService.getUserId().subscribe((user) => {
        this.userId = user.sub;
      })
    );
  }

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.params.subscribe((params) => {
        this.eventId = params['id'];
      })
    );
    this.loadEvent();
    this.createPostForm();
    this.loadParams();

    //Måste lösa på snyggare sätt, går inte att sätta i subscriben ovan..
    /* this.loadPageParams();
    this.loadTabParams(); */
  }

  loadEvent() {
    this.store$.dispatch(new fromEvents.LoadEvent(+this.eventId));
    this.showSnackbarLoadEvent();

    this.ev$ = this.store$.pipe(select(fromEvents.getCurrentEvent));

    this.loadPosts();
    this.loadParticipants();
  }

  loadPosts() {
    this.posts$ = this.store$.pipe(select(fromEvents.getEventPosts));
  }

  loadParticipants() {
    this.attendedParticipants$ = this.store$.pipe(select(fromEvents.getAttendedParticipants));
    this.invitedParticipants$ = this.store$.pipe(select(fromEvents.getInvitedParticipants));
    this.declinedParticipants$ = this.store$.pipe(select(fromEvents.getDeclinedParticipants));
  }

  updateParticpantsToEvent(id: number, answer: string, title: string) {
    var data = [id, +this.userId, answer];
    this.store$.dispatch(new fromEvents.AddEventParticipant(data));

    this.showSnackBarUpdateParticipants(answer, title);
  }

  checkAttendedUsers() {
    let attendedUsers: User[];
    this.subscription.add(this.attendedParticipants$.subscribe((data) => (attendedUsers = data)));

    if (attendedUsers.some((u) => u.id === +this.userId)) {
      return true;
    } else {
      return false;
    }
  }

  checkDeclinedUsers() {
    let declinedUsers: User[];
    this.subscription.add(this.declinedParticipants$.subscribe((data) => (declinedUsers = data)));

    if (declinedUsers.some((u) => u.id === +this.userId)) {
      return true;
    } else {
      return false;
    }
  }

  countParticipants(users: Observable<User[]>) {
    let countParticipants: User[];
    this.subscription.add(users.subscribe((data) => (countParticipants = data)));
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

      this.showSnackBarCreatePost();
      this.postForm.reset();
    }
  }

  deletePost(id: number, postId: number) {
    var data = [id, postId];
    this.store$.dispatch(new fromEvents.DeletePost(data));
    this.showSnackbarDeletePost();
  }

  getDayOfWeek(date: Date) {
    const dayOfWeek = new Date(date).getDay();
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

    if (endD.getHours() != 23 && endD.getMinutes() != 59) {
      return true;
    } else {
      return false;
    }
  }

  confirmDialog(id: number, postId: number): void {
    const message = `Vill du ta bort kommentaren?`;
    const dialogData = new ConfirmDialogModel('Bekräfta', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult == true) {
          this.deletePost(id, postId);
        }
      })
    );
  }

  viewParticipants(): void {
    const dialogData = new ParticipantsDialogModel(
      'Deltagarlista',
      this.attendedParticipants$,
      this.invitedParticipants$,
      this.declinedParticipants$
    );
    this.dialog.open(ParticipantsDialogComponent, {
      maxWidth: '700px',
      minHeight: '400px',
      maxHeight: '900px',
      data: dialogData,
    });
  }

  loadParams() {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.selectedPage = params['page'];
        this.selectedTab = params['tab'];
      })
    );
  }
  
  showSnackBarUpdateParticipants(answer: string, title: string) {
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.ADD_EVENT_PARTICIPANT_SUCCESS)).subscribe((action) => {
        if (answer == 'accepted') {
          this.snackBar.open('Du är tillagd i evenemanget ' + title, '', { duration: 2500 });
        }
        if (answer == 'declined') {
          this.snackBar.open('Du är borttagen ur evenemanget ' + title, '', { duration: 2500 });
        }
      })
    );
  }

  showSnackbarLoadEvent() {
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.LOAD_EVENT_ERROR)).subscribe((action) => {
        this.snackBar.open('Evenemanget kunde inte laddas', '', { duration: 10000 });
      })
    );
  }

  showSnackBarCreatePost() {
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.ADD_POST_EVENT_SUCCESS)).subscribe((action) => {
        this.snackBar.open('Kommentaren postad', '', { duration: 2500 });
      })
    );
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.ADD_POST_EVENT_ERROR)).subscribe((action) => {
        this.snackBar.open('Någonting gick fel, försök igen', '', { duration: 5000 });
      })
    );
  }

  showSnackbarDeletePost() {
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.REMOVE_POST_EVENT)).subscribe((action) => {
        this.snackBar.open('Kommentaren borttagen', '', { duration: 2500 });
      })
    );

    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.REMOVE_POST_EVENT_ERROR)).subscribe((action) => {
        this.snackBar.open('Någonting gick fel, försök igen', '', { duration: 5000 });
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
