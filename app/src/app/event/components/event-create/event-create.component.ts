import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { AppState } from 'src/app/core/state';

import { Event, User, Office } from 'src/app/shared/models';
import * as fromEvents from '../../state/events';
import * as fromUsers from '../../../user/state/users';
import * as fromOffices from '../../../start/state/offices';

import { Observable, Subscription, of } from 'rxjs';
import { DateAdapter, MatSnackBar } from '@angular/material';

import { ActionTypes } from '../../state/events';
import { filter, startWith, debounceTime, switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services';
import { getLoadingData, getLoadingByKey } from '../../../core/state/loading';
import { Router } from '@angular/router';

@Component({
  selector: 'ex-event-create',
  templateUrl: './event-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-create.component.scss'],
})
export class EventCreateComponent implements OnInit, OnDestroy {
  //@Output() cancelNewEvent = new EventEmitter();
  subscription = new Subscription();
  loadings$ = this.store$.pipe(select(getLoadingData));
  event: Event;
  users$: Observable<User[]>;
  offices$: Observable<Office[]>;
  allUsers: User[];
  users: User[];
  userId: number;
  eventForm: FormGroup;
  endDateMode = false;
  fileUpload: File = null;
  imageUrl: any = null;
  invalidImage = false;

  search = new FormControl();
  searchField;
  usersControl = new FormControl();

  currentDate = new Date();
  starttime: Date;
  endtime: Date;

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>,
    private actionsSubject$: ActionsSubject,
    public authService: AuthenticationService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    dateAdapter.setLocale('sv');
    this.subscription.add(
      authService.getUserId().subscribe((user) => {
        this.userId = user.sub;
      })
    );
  }

  ngOnInit() {
    this.loadOffices();
    this.loadUsers();
    this.createEventForm();
  }

  createEventForm() {
    this.eventForm = this.fb.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        imageurl: [null],
        location: ['', Validators.required],
        startdate: [null, Validators.required],
        starttime: [null, Validators.required],
        enddate: [null],
        endtime: [null],
        createdate: [null],
        creatorid: [+this.userId],
        users: [null],
        offices: [null],
      },
      { validator: this.dateValidation }
    );
  }

  createEvent() {
    if (this.eventForm.valid) {
      this.checkEmptyEndDate(this.eventForm);

      this.eventForm.get('createdate').setValue(new Date());

      //Fixar problem med tidzon när datum skickas till servern
      this.fixDateTimeZone(this.eventForm.get('starttime').value);
      this.fixDateTimeZone(this.eventForm.get('endtime').value);
      this.fixDateTimeZone(this.eventForm.get('createdate').value);
      this.fixDateTimeZone(this.eventForm.get('startdate').value);
      this.fixDateTimeZone(this.eventForm.get('enddate').value);

      this.event = Object.assign({}, this.eventForm.value);

      this.store$.dispatch(new fromEvents.CreateEvent(this.event, this.fileUpload));
      this.showSnackbar();
    }
  }

  //Load the image as a file from event$
  fileProgress(fileInput: any) {
    this.imageUrl = null;
    this.invalidImage = false;
    this.eventForm.get('imageurl').setValue(null);

    this.fileUpload = <File>fileInput.target.files[0];

    if (this.fileUpload) {
      this.imagePreview();
    }
  }

  //Show the chosen file in html if it is an image
  imagePreview() {
    let mimeType = this.fileUpload.type;
    let mimeSize = this.fileUpload.size;

    //Check for only images and smaller than or equal to 5mb
    if (mimeType.match(/image\/*/) != null && mimeSize <= 5000000) {
      let reader = new FileReader();
      reader.readAsDataURL(this.fileUpload);
      reader.onload = (_event) => {
        this.imageUrl = reader.result;
      };
      this.eventForm.get('imageurl').setValue(this.fileUpload.name);
      this.invalidImage = false;
    } else {
      this.fileUpload = null;
      this.eventForm.get('imageurl').setValue(null);
      this.invalidImage = true;
    }
  }

  //Removes the image
  clearImage() {
    this.fileUpload = null;
    this.imageUrl = null;
    this.invalidImage = false;
    this.eventForm.get('imageurl').setValue(null);
  }

  loadOffices() {
    this.store$.dispatch(new fromOffices.LoadOffices());
    this.offices$ = this.store$.pipe(select(fromOffices.getOffices));
  }

  loadUsers() {
    /* this.actionsSubject$.pipe(filter((action: any) => action.type, { action: '@ngrx/store/update-reducers', feature: 'user'})); */
    this.store$.dispatch(new fromUsers.GetUsers());
    this.subscription.add(
      this.store$.pipe(select(fromUsers.getRelevantUsers(+this.userId))).subscribe((data) => {
        this.allUsers = data;
      this.allUsers = data; 
        this.allUsers = data;
      })
    );

    this.filterUsers();
  }

  filterUsers() {
    this.users$ = this.search.valueChanges.pipe(
      startWith(null),
      debounceTime(200),
      switchMap((res: string) => {
        if (!res) return of(this.allUsers);
        res = res.toLowerCase();
        return of(this.allUsers.filter((x) => x.name.toLowerCase().indexOf(res) >= 0));
      })
    );
  }

  selectionChange(option: any) {
    let value = this.usersControl.value || [];
    if (option.selected) value.push(option.value);
    else value = value.filter((x: any) => x != option.value);
    this.usersControl.setValue(value);
  }

  endDateToggle() {
    this.endDateMode = !this.endDateMode;

    //this.endDateMode ? this.addEndDate() : this.removeEndDate();

    if (this.endDateMode == true) {
      this.addEndDate();
    } else {
      this.removeEndDate();
    }
  }

  addEndDate() {
    this.eventForm.controls['enddate'].setValue(this.eventForm.value.startdate);
    this.eventForm.controls['endtime'].setValue(this.eventForm.value.starttime);
  }

  removeEndDate() {
    this.eventForm.controls['enddate'].setValue(null);
    this.eventForm.controls['endtime'].setValue(null);
  }

  dateValidation(d: FormGroup) {
    if (d.get('enddate').value != null) {
      return d.get('enddate').value >= d.get('startdate').value ? null : { mismatch: true };
    } else {
      return null;
    }
  }

  checkEmptyEndDate(f: FormGroup) {
    if (f.get('enddate').value == null) {
      this.eventForm.controls['enddate'].setValue(this.eventForm.value.startdate);
    }
    if (f.get('endtime').value == null) {
      this.eventForm.controls['endtime'].setValue(new Date(0, 0, 0, 0, 0, 0, 0));
    }
  }

  fixDateTimeZone(d: Date): Date {
    d.setHours(d.getHours() - d.getTimezoneOffset() / 60);
    return d;
  }

  getErrorMessage(property: string) {
    switch (property) {
      case 'title': {
        this.eventForm.get('title').hasError('required');
        return 'Du måste ange en titel';
      }

      case 'location': {
        this.eventForm.get('location').hasError('required');
        return 'Du måste ange en plats';
      }

      case 'description': {
        this.eventForm.get('description').hasError('required');
        return 'Du måste ange en beskrivning';
      }

      case 'startdate': {
        this.eventForm.get('startdate').hasError('required');
        return 'Du måste ange ett startdatum';
      }

      case 'imageurl': {
        this.eventForm.get('imageurl').hasError('imageurl');
        return 'Inkorrekt filtyp eller för stor fil. (Endast bilder under 5mb)';
      }
    }
  }

  clearField() {
    this.searchField = '';
  }

  showSnackbar() {
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.CREATE_EVENT_SUCCESS)).subscribe((action) => {
        var title = action.payload.title;
        this.snackBar.open(title + ' är nu tillagt i evenemangslistan', '', { duration: 2500 });
      })
    );

    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.CREATE_EVENT_ERROR)).subscribe((action) => {
        this.snackBar.open('Någonting gick fel, försök igen', '', { duration: 5000 });
      })
    );

    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.UPLOAD_IMAGE_SUCCESS)).subscribe((action) => {
        this.snackBar.open('Evenemanget är nu tillagt i listan', '', { duration: 2500 });
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
