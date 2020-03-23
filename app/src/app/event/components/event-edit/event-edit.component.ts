import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from 'src/app/shared/models';
import * as fromEvent from '../../state/events';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ex-event-edit',
  templateUrl: './event-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  ev$: Observable<Event>;
  event: Event;
  eventEditForm: FormGroup;

  constructor(private store$: Store<AppState>, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.ev$ = this.store$.pipe(select(fromEvent.getCurrentEvent));
    console.log(this.ev$);
    this.createEventEditForm();
    console.log(this.eventEditForm);
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

      this.event = Object.assign({}, this.eventEditForm.value);
      console.log(this.event);
      this.store$.dispatch(new fromEvent.UpdateEvent(this.event));
      this.router.navigate(['/event/' + this.event.id]);
    }
  }

  fixDateTimeZone(d: Date): Date {
    d.setHours(d.getHours() - d.getTimezoneOffset() / 60);
    return d;
  }
}
