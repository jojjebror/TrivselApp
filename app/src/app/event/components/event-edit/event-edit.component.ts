import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { Observable} from 'rxjs';
import { Event } from 'src/app/shared/models';
import * as fromEvents from '../../state/events';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ex-event-edit',
  templateUrl: './event-edit.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit, OnDestroy {
  ev$: Observable<Event>;
  eventEditForm: FormGroup;

  constructor(private store$: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.ev$ = this.store$.pipe(select(fromEvents.getCurrentEvent));
    this.createEventEditForm();
  }

  ngOnDestroy() {
    
  }

  createEventEditForm() {
    this.ev$.subscribe(ev => {
      this.eventEditForm = this.fb.group({
        id: [ev.id],
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
      //Fixar problem med UTC och lokal tid när datum skickas till servern
      //this.fixDateTimeZone(this.eventEditForm.get('starttime').value);
      //this.fixDateTimeZone(this.eventEditForm.get('endtime').value);

      const ev = Object.assign({}, this.eventEditForm.value);
      this.store$.dispatch(new fromEvents.UpdateEvent(ev));
    }
  }

  fixDateTimeZone(d: Date): Date {
    d.setHours(d.getHours() - d.getTimezoneOffset() / 60);
    return d;
  }
}
