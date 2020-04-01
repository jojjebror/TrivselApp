import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { Observable} from 'rxjs';
import { Event } from 'src/app/shared/models';
import * as fromEvents from '../../state/events';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'ex-event-edit',
  templateUrl: './event-edit.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit, OnDestroy {
  ev$: Observable<Event>;
  eventEditForm: FormGroup;

  starttime: Date;
  endtime: Date;

  constructor(private store$: Store<AppState>, private fb: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('sv');
  }

  ngOnInit() {
    this.ev$ = this.store$.pipe(select(fromEvents.getCurrentEvent));
    this.createEventEditForm();
  }

  ngOnDestroy() {}

  createEventEditForm() {
    this.ev$.subscribe(ev => {
      this.eventEditForm = this.fb.group({
        id: [ev.id],
        title: [ev.title, Validators.required],
        description: [ev.description, Validators.required],
        image: [ev.image],
        location: [ev.location, Validators.required],
        startdate: [new Date(ev.startDate)],
        starttime: [new Date(ev.startDate)],
        enddate: [new Date(ev.endDate)],
        endtime: [new Date(ev.endDate)]
      });
      this.starttime = ev.startDate;
      this.endtime = ev.endDate;
    });
  }

  updateEvent() {
    if (this.eventEditForm.valid) {

      console.log(this.eventEditForm)
      //Fixar problem med UTC och lokal tid när datum skickas till servern
      this.fixDateTimeZone(this.eventEditForm.get('starttime').value);
      this.fixDateTimeZone(this.eventEditForm.get('endtime').value);

      const ev = Object.assign({}, this.eventEditForm.value);
      this.store$.dispatch(new fromEvents.UpdateEvent(ev));
    }
  }

  fixDateTimeZone(d: Date): Date {
    d.setHours(d.getHours() - d.getTimezoneOffset() / 60);
    return d;
  }

  getErrorMessageTitle() {
    if (this.eventEditForm.get('title').hasError('required')) {
      return 'Du måste ange en titel';
    }
  }

  getErrorMessageLocation() {
    if (this.eventEditForm.get('location').hasError('required')) {
      return 'Du måste ange en plats';
    }
  }

  getErrorMessageDescription() {
    if (this.eventEditForm.get('description').hasError('required')) {
      return 'Du måste ange en beskrivning';
    }
  }

  getErrorMessageStartdate() {
    if (this.eventEditForm.get('startdate').hasError('required')) {
      return 'Du måste ange ett startdatum';
    }
  }
}
