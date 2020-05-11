import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { AppState } from 'src/app/core/state';

import { Event, User } from 'src/app/shared/models';
import * as fromEvents from '../../state/events';
import * as fromUsers from '../../../user/state/users';

import { Observable, Subscription, of } from 'rxjs';
import { DateAdapter, MatSnackBar } from '@angular/material';

import { ActionTypes } from '../../state/events';
import { filter, startWith, debounceTime, switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services';
import { getLoadingData, getLoadingByKey } from '../../../core/state/loading';


@Component({
  selector: 'ex-event-create',
  templateUrl: './event-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-create.component.scss'],
})
export class EventCreateComponent implements OnInit, OnDestroy {
  @Output() cancelNewEvent = new EventEmitter();
  subscription = new Subscription();
  loadings$ = this.store$.pipe(select(getLoadingData));
  event: Event;
  users$: Observable<User[]>;
  allUsers: User[];
  users: User[];
  userId: number;
  eventForm: FormGroup;
  endDateMode = false;
  toggleFormHeight: boolean = true;
  fileUpload: File = null;
  imageUrl: any = null;

  search = new FormControl();
  searchField;
  usersControl = new FormControl();

  currentDate = new Date();
  starttime: Date;
  endtime: Date;

  offices: string[] = [
    'Linköping',
    'Stockholm',
    'Göteborg',
    'Malmö',
    'Uppsala',
    'Örebro',
    'Söderhamn',
    'Borlänge',
    'Helsingborg',
    'Karlstad',
  ];

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>,
    private actionsSubject$: ActionsSubject,
    public authService: AuthenticationService,
    private cd: ChangeDetectorRef
  ) {
    dateAdapter.setLocale('sv');
    this.subscription.add(
      authService.getUserId().subscribe((user) => {
        this.userId = user.sub;
      })
    );
  }

  ngOnInit() {
    this.createEventForm();
    this.loadUsers();
  }

  createEventForm() {
    this.eventForm = this.fb.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        imageurl: [null],
        location: ['', Validators.required],
        startdate: ['', Validators.required],
        starttime: ['', Validators.required],
        enddate: [''],
        endtime: [''],
        createdate: [''],
        creatorid: [+this.userId],
        users: [null],
        offices: [['']],
      },
      { validator: this.DateValidation }
    );
  }

  createEvent() {
    if (this.eventForm.valid) {
      this.CheckEmptyEndDate(this.eventForm);

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

  fileProgress(fileInput: any) {
    this.fileUpload = <File>fileInput.target.files[0];
    this.imagePreview();
  }

  imagePreview() {
    // Show preview
    var mimeType = this.fileUpload.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileUpload);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    };
  }

  private loadUsers() {
    /*     ----------------------Spara, måste hitta en bättre lösning än timeout... ------------------------*/

    /* this.subscription.add(this.store$.select(fromSession.selectInitialized).subscribe((response) => (this.initialized = response)));
    console.log(this.initialized); */

    /* if (this.initialized == true) {
      this.store$.dispatch(new fromUsers.GetUsers());
      this.users$ = this.store$.pipe(select(fromUsers.getUsers));
    } else {
      setTimeout(() => {
        this.store$.dispatch(new fromUsers.GetUsers());
        this.users$ = this.store$.pipe(select(fromUsers.getUsers));
        this.cd.detectChanges();
      }, 300);
    }  */

    setTimeout(() => {
      this.store$.dispatch(new fromUsers.GetUsers());
      /* this.users$ = this.store$.pipe(select(fromUsers.getUsers)); */
      this.store$.pipe(select(fromUsers.getUsers)).subscribe((data: User[]) => {
        this.allUsers = data;
      });
      this.cd.detectChanges();
    }, 120);

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
    this.toggleFormHeight = !this.toggleFormHeight;

    //this.endDateMode ? (this.endDateMode = false) : (this.endDateMode = true);
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
    this.eventForm.controls['enddate'].setValue('');
    this.eventForm.controls['endtime'].setValue('');
  }

  DateValidation(d: FormGroup) {
    if (d.get('enddate').value !== '') {
      return d.get('enddate').value >= d.get('startdate').value ? null : { mismatch: true };
    } else {
      return null;
    }
  }

  CheckEmptyEndDate(f: FormGroup) {
    if (f.get('enddate').value == '') {
      this.eventForm.controls['enddate'].setValue(this.eventForm.value.startdate);
    }
    if (f.get('endtime').value == '') {
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
        var title = action.payload.title;
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
