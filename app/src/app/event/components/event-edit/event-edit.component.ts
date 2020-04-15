import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { Observable, Subscription } from 'rxjs';
import { Event } from 'src/app/shared/models';
import * as fromEvents from '../../state/events';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ex-event-edit',
  templateUrl: './event-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit, OnDestroy {
  ev$: Observable<Event>;
  eventEditForm: FormGroup;
  subscription: Subscription;

  eventId: any;
  starttime: Date;
  endtime: Date;
  fileUpload: File = null;
  imageUrl: string;

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private dateAdapter: DateAdapter<Date>,
    private activatedRoute: ActivatedRoute
  ) {
    dateAdapter.setLocale('sv');
  }

  ngOnInit() {
    /* this.subscription = this.activatedRoute.params.subscribe((params) => {
      this.eventId = params['id'];
    });
    console.log(this.eventId);

    this.store$.dispatch(new fromEvents.LoadEditEvent(this.eventId)); */

    this.ev$ = this.store$.pipe(select(fromEvents.getCurrentEvent));
    this.createEventEditForm();
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

  createEventEditForm() {
    this.ev$.subscribe((ev) => {
      this.eventEditForm = this.fb.group(
        {
          id: [ev.id],
          title: [ev.title, Validators.required],
          description: [ev.description, Validators.required],
          image: [null],
          location: [ev.location, Validators.required],
          startdate: [new Date(ev.startDate), Validators.required],
          starttime: [new Date(ev.startDate), Validators.required],
          enddate: [new Date(ev.endDate), Validators.required],
          endtime: [new Date(ev.endDate), Validators.required],
        },
        { validator: this.DateValidation }
      );
      this.starttime = ev.startDate;
      this.endtime = ev.endDate;
      this.eventId = ev.id;
      this.imageUrl = ev.image;
    });
  }

  updateEvent() {
    if (this.eventEditForm.valid) {
      //Fixar problem med UTC och lokal tid när datum skickas till servern
      this.fixDateTimeZone(this.eventEditForm.get('starttime').value);
      this.fixDateTimeZone(this.eventEditForm.get('endtime').value);

      const ev = Object.assign({}, this.eventEditForm.value);
      this.store$.dispatch(new fromEvents.UpdateEvent(ev, this.fileUpload));
      this.alertify.success('Evenemanget uppdaterat');
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
}
