import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';

import { Event } from 'src/app/shared/models';
import * as fromEvent from '../../state/events/events.actions';
import { AlertifyService } from 'src/app/core/services/alertify.service';

@Component({
  selector: 'ex-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  @Output() cancelNewEvent = new EventEmitter();
  event: Event;
  currentUserId: any;
  eventForm: FormGroup;
  endDateMode = false;

  constructor(
    private store$: Store<AppState>,
    private router: Router,
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private localeService: BsLocaleService
  ) {
    localeService.use('sv');
    this.store$.select('session').subscribe(data => (this.currentUserId = data.user.id));
  }

  ngOnInit() {
    this.createEventForm();
    console.log(this.eventForm);
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
        createdate: [new Date()],
        creatorid: [this.currentUserId]
      },
      { validator: this.DateValidation }
    );
  }

  createEvent() {
    if (this.eventForm.valid) {
    console.log(this.eventForm)

      this.CheckEmptyEndDate(this.eventForm);

      //Fixar problem med UTC och lokal tid när datum skickas till servern
      this.fixDateTimeZone(this.eventForm.get('starttime').value)
      this.fixDateTimeZone(this.eventForm.get('endtime').value);
      this.fixDateTimeZone(this.eventForm.get('createdate').value);


      this.event = Object.assign({}, this.eventForm.value);

      this.store$.dispatch(new fromEvent.CreateEvent(this.event));

      this.router.navigate(['/event']);
      this.alertify.success('Evenemanget har skapats');
    }
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
      this.eventForm.controls['enddate'].setValue(new Date(0, 0, 0, 0, 0, 0, 0));
    }
    if (f.get('endtime').value == '') {
      this.eventForm.controls['endtime'].setValue(new Date(0, 0, 0, 0, 0, 0, 0));
    }
  }

  fixDateTimeZone(d: Date): Date {
    d.setHours(d.getHours() - d.getTimezoneOffset() / 60);
    return d;
  }
}

