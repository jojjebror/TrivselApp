import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';

import { Event, User } from 'src/app/shared/models';
import * as fromEvents from '../../state/events';
import * as fromUsers from '../../../user/state/users';

import { AlertifyService } from 'src/app/core/services/alertify.service';
import { Observable } from 'rxjs';
import { DateAdapter, MatSnackBar } from '@angular/material';

import * as fromSession from '../../../core/state/session';

@Component({
  selector: 'ex-event-create',
  templateUrl: './event-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-create.component.scss'],
})
export class EventCreateComponent implements OnInit {
  @Output() cancelNewEvent = new EventEmitter();
  event: Event;
  users$: Observable<User[]>;
  userId: number;
  eventForm: FormGroup;
  endDateMode = false;
  fileUpload: File = null;
  imageUrl: string;

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
    private dateAdapter: DateAdapter<Date>
  ) {
    dateAdapter.setLocale('sv');
    this.store$.select(fromSession.selectUserId).subscribe((user) => (this.userId = user));
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
        image: [''],
        location: ['', Validators.required],
        startdate: ['', Validators.required],
        starttime: ['', Validators.required],
        enddate: [''],
        endtime: [''],
        createdate: [''],
        creatorid: [this.userId],
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
      this.fixDateTimeZone(this.eventForm.get('startdate').value)
      this.fixDateTimeZone(this.eventForm.get('enddate').value);

      this.event = Object.assign({}, this.eventForm.value);

      this.store$.dispatch(new fromEvents.CreateEvent(this.event, this.fileUpload));

      this.snackBar.open('Evenemanget har skapats', '', { duration: 2500 });
    }
  }

  /* imagePreview(file: FileList) {
    this.fileUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileUpload);
  } */

  loadImage(file: FileList) {
    this.fileUpload = file.item(0);
  }

  imageValidator(control: FormControl) {
    //Får inte att fungera med formbuilder
    if (control.value) {
      if (this.fileUpload) {
        const allowedInput = '/image-*/';
        //const fileExtension = this.fileUpload.name.split('.').pop().toLowerCase();
        const fileExtension = this.fileUpload.type;
        console.log(fileExtension);
        if (fileExtension.match(allowedInput)) {
          return true;
        }
        return false;
      }
    }
  }

  private loadUsers(): void {
    setTimeout(() => { this.store$.dispatch(new fromUsers.GetUsers()); }, 1000);
    this.users$ = this.store$.pipe(select(fromUsers.getUsers));
  }

  endDateToggle() {
    this.endDateMode ? (this.endDateMode = false) : (this.endDateMode = true);
    if (this.endDateMode == true) {
      this.addEndDate();
    } else {
      this.cancelEndDate();
    }
  }

  addEndDate() {
    this.eventForm.controls['enddate'].setValue(this.eventForm.value.startdate);
    this.eventForm.controls['endtime'].setValue(this.eventForm.value.starttime);
  }

  cancelEndDate() {
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
}
