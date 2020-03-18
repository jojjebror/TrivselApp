import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';

import { Event } from 'src/app/shared/models';
import * as fromSession from '../../../core/state/session';
import * as fromEvent from '../../state/events/events.actions';
import { AuthenticationService } from '../../../core/services';


@Component({
  selector: 'ex-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  @Output() cancelNewEvent = new EventEmitter();
  event: Event;
  eventForm: FormGroup;
  endDateMode = false;

  constructor(private store$: Store<AppState>, private router: Router, private fb: FormBuilder, private localeService: BsLocaleService) {
    localeService.use('sv');
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
        creatorid: [1]
      },
      { validator: this.DateValidation }
    );
  }

  createEvent() {
    if (this.eventForm.valid) {
      this.event = Object.assign({}, this.eventForm.value);
      this.store$.dispatch(new fromEvent.CreateEvent(this.event));

      this.router.navigate(['/event']);
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
}
