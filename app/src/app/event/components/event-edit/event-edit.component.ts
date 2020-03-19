import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from 'src/app/shared/models';
import * as fromEvent from '../../state/events';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ex-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  ev$: Observable<Event>;
  event: Event;
  eventEditForm: FormGroup;

  constructor(private store$: Store<AppState>, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.ev$ = this.store$.pipe(select(fromEvent.getCurrentEvent));
    console.log(this.ev$);
    this.createEventEditForm();
    console.log(this.eventEditForm);
  }

  createEventEditForm() {
    this.ev$.subscribe(ev => {
      this.eventEditForm = this.fb.group({
        title: [ev.title, Validators.required],
        description: [ev.description, Validators.required],
        image: [ev.image],
        location: [ev.location, Validators.required],
        startdate: [ev.startDate],
        starttime: [ev.startDate],
        enddate: [ev.endDate],
        endtime: [ev.endDate]
      });
    });
  }

  updateEvent() {
     if (this.eventEditForm.valid) {
      this.event = Object.assign({}, this.eventEditForm.value);
      this.store$.dispatch(new fromEvent.UpdateEvent(this.event));
     }
  }
}
