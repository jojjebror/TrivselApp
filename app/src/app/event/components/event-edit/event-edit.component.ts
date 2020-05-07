import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { Store, select, ActionsSubject } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { Observable, Subscription } from 'rxjs';
import { Event, User } from 'src/app/shared/models';
import * as fromEvents from '../../state/events';
import * as fromUsers from '../../../user/state/users';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ActionTypes } from '../../state/events';


@Component({
  selector: 'ex-event-edit',
  templateUrl: './event-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-edit.component.scss'],
})
export class EventEditComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  ev$: Observable<Event>;
  evt: Event;
  users$: Observable<User[]>;
  invitedParticipants$: Observable<User[]>;
  users: User[];
  eventEditForm: FormGroup;

  eventId: number;
  currentDate = new Date();
  starttime: Date;
  endtime: Date;
  fileUpload: File = null;
  imageUrl: string;

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>,
    private activatedRoute: ActivatedRoute,
    private actionsSubject$: ActionsSubject,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    dateAdapter.setLocale('sv');
  }

  ngOnInit() {
    this.loadData();
    this.loadUsers();
  }

  loadData() {
    this.subscription.add(
      this.store$.pipe(select(fromEvents.getCurrentEvent)).subscribe((data) => {
        this.evt = data;
      })
    );
    if (this.evt != undefined) {
      this.createEventEditForm();
    } else {
      this.router.navigate(['/event']);
    }
  }

  createEventEditForm() {
    /* this.store$.pipe(select(fromEvents.getCurrentEvent)).subscribe((ev) => { */
    this.eventEditForm = this.fb.group(
      {
        id: [this.evt.id],
        title: [this.evt.title, Validators.required],
        description: [this.evt.description, Validators.required],
        imageurl: [null],
        location: [this.evt.location, Validators.required],
        startdate: [new Date(this.evt.startDate), Validators.required],
        starttime: [new Date(this.evt.startDate), Validators.required],
        enddate: [new Date(this.evt.endDate), Validators.required],
        endtime: [new Date(this.evt.endDate), Validators.required],
        users: [null]
      },
      { validator: this.DateValidation }
    );
    this.starttime = this.evt.startDate;
    this.endtime = this.evt.endDate;
    this.eventId = this.evt.id;
    this.imageUrl = this.evt.imageUrl;
  }

  updateEvent() {
    if (this.eventEditForm.valid) {
      //Fixar problem med UTC och lokal tid när datum skickas till servern
      this.fixDateTimeZone(this.eventEditForm.get('starttime').value);
      this.fixDateTimeZone(this.eventEditForm.get('endtime').value);
      this.fixDateTimeZone(this.eventEditForm.get('startdate').value);
      this.fixDateTimeZone(this.eventEditForm.get('enddate').value);

      const ev = Object.assign({}, this.eventEditForm.value);
      this.store$.dispatch(new fromEvents.UpdateEvent(ev, this.fileUpload));

      this.subscription.add(
        this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.UPDATE_EVENT_SUCCESS)).subscribe((action) => {
          this.snackBar.open('Evenemanget är nu uppdaterat', '', { duration: 2500 });
        })
      );

      this.subscription.add(
        this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.UPDATE_EVENT_ERROR)).subscribe((action) => {
          this.snackBar.open('Någonting gick fel, försök igen', '', { duration: 5000 });
        })
      );
    }
  }

  loadImage(file: FileList) {
    this.fileUpload = file.item(0);
  }

  fixDateTimeZone(d: Date): Date {
    d.setHours(d.getHours() - d.getTimezoneOffset() / 60);
    return d;
  }

  DateValidation(d: FormGroup) {
    if (d.get('enddate').value !== '') {
      return d.get('enddate').value >= d.get('startdate').value ? null : { mismatch: true };
    } else {
      return null;
    }
  }

  getErrorMessage(property: string) {
    switch (property) {
      case 'title': {
        this.eventEditForm.get('title').hasError('required');
        return 'Du måste ange en titel';
      }

      case 'location': {
        this.eventEditForm.get('location').hasError('required');
        return 'Du måste ange en plats';
      }

      case 'description': {
        this.eventEditForm.get('description').hasError('required');
        return 'Du måste ange en beskrivning';
      }

      case 'startdate': {
        this.eventEditForm.get('startdate').hasError('required');
        return 'Du måste ange ett startdatum';
      }

      case 'enddate': {
        this.eventEditForm.get('enddate').hasError('required');
        return 'Du måste ange ett slutdatum';
      }
    }
  }

  private loadUsers() {
    this.store$.dispatch(new fromUsers.GetUsers());
    this.users$ = this.store$.pipe(select(fromUsers.getUsers));

    this.invitedParticipants$ = this.store$.pipe(select(fromEvents.getInvitedParticipants))
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
