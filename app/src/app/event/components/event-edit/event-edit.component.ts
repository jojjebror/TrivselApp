import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { Store, select, ActionsSubject } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { Observable, Subscription, of } from 'rxjs';
import { Event, User } from 'src/app/shared/models';
import * as fromEvents from '../../state/events';
import * as fromUsers from '../../../user/state/users';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DateAdapter, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { filter, startWith, debounceTime, switchMap } from 'rxjs/operators';
import { getLoadingData, getLoadingByKey } from '../../../core/state/loading';
import { AuthenticationService } from 'src/app/core/services';

@Component({
  selector: 'ex-event-edit',
  templateUrl: './event-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-edit.component.scss'],
})
export class EventEditComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  loadings$ = this.store$.pipe(select(getLoadingData));
  //ev$: Observable<Event>;
  ev: Event;
  users$: Observable<User[]>;
  allUsers: User[];
  invitedParticipants$: Observable<User[]>;
  invitedParticipants: User[];
  users: User[];
  userId: number;
  eventEditForm: FormGroup;

  eventId: number;
  currentDate = new Date();
  starttime: Date;
  endtime: Date;
  fileUpload: File = null;
  imageUrl: any = null;
  invalidImage = false;

  search = new FormControl();
  searchField: string;
  usersControl = new FormControl();

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>,
    private actionsSubject$: ActionsSubject,
    private router: Router,
    public authService: AuthenticationService
  ) {
    dateAdapter.setLocale('sv');
    this.subscription.add(
      authService.getUserId().subscribe((user) => {
        this.userId = user.sub;
      })
    );
  }

  ngOnInit() {
    this.loadEvent();
  }

  loadEvent() {
    this.subscription.add(
      this.store$.pipe(select(fromEvents.getCurrentEvent)).subscribe((data) => {
        this.ev = data;
      })
    );
    /* temporärt som fan */
    if (this.ev != undefined) {
      this.createEventEditForm();
    } else {
      this.router.navigate(['/event']);
    }

    this.loadUsers();
  }

  private loadUsers() {
    this.store$.dispatch(new fromUsers.GetUsers());

    this.invitedParticipants$ = this.store$.pipe(select(fromEvents.getInvitedParticipants));

    this.subscription.add(this.invitedParticipants$.subscribe((data) => (this.invitedParticipants = data)));

    this.subscription.add(
      this.store$.pipe(select(fromUsers.getAllUsersExceptInvited(this.invitedParticipants))).subscribe((data) => {
        this.allUsers = data;
      })
    );

    this.filterUsers();
  }

  createEventEditForm() {
    this.eventEditForm = this.fb.group(
      {
        id: [this.ev.id],
        title: [this.ev.title, Validators.required],
        description: [this.ev.description, Validators.required],
        imageurl: [null],
        location: [this.ev.location, Validators.required],
        startdate: [new Date(this.ev.startDate), Validators.required],
        starttime: [new Date(this.ev.startDate), Validators.required],
        enddate: [new Date(this.ev.endDate), Validators.required],
        endtime: [new Date(this.ev.endDate), Validators.required],
        users: [null],
      },
      { validator: this.DateValidation }
    );
    this.starttime = this.ev.startDate;
    this.endtime = this.ev.endDate;
    this.eventId = this.ev.id;
    this.imageUrl = this.ev.imageUrl;
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

  updateEvent() {
    if (this.eventEditForm.valid) {
      //Fixar problem med UTC och lokal tid när datum skickas till servern
      this.fixDateTimeZone(this.eventEditForm.get('starttime').value);
      this.fixDateTimeZone(this.eventEditForm.get('endtime').value);
      this.fixDateTimeZone(this.eventEditForm.get('startdate').value);
      this.fixDateTimeZone(this.eventEditForm.get('enddate').value);

      const ev = Object.assign({}, this.eventEditForm.value);
      this.store$.dispatch(new fromEvents.UpdateEvent(ev, this.fileUpload));
      this.showSnackbarUpdateEvent();
    }
  }

  /*  fileProgress(fileInput: any) {
    this.fileUpload = <File>fileInput.target.files[0];
    this.imagePreview();
  } */

  //imagePreview() {
  //var mimeType = this.fileUpload.type;
  //if (mimeType.match(/image\/*/) == null) {
  // return;
  //}

  //var reader = new FileReader();
  //reader.readAsDataURL(this.fileUpload);
  //reader.onload = (_event) => {
  //this.imageUrl = reader.result;
  //};
  //}

  //Load the image as a file from event$
  fileProgress(fileInput: any) {
    //this.imageUrl = null;
    this.invalidImage = false;
    //this.eventEditForm.get('imageurl').setValue(null);

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
      this.eventEditForm.get('imageurl').setValue(this.fileUpload.name);
      this.invalidImage = false;
    } else {
      this.fileUpload = null;
      this.eventEditForm.get('imageurl').setValue(null);
      this.invalidImage = true;
    }
  }

  //Removes the image
  clearImage() {
    this.fileUpload = null;
    this.imageUrl = this.ev.imageUrl;
    this.invalidImage = false;
    this.eventEditForm.get('imageurl').setValue(null);
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

  clearField() {
    this.searchField = '';
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

      case 'imageurl': {
        this.eventEditForm.get('imageurl').hasError('imageurl');
        return 'Inkorrekt filtyp eller för stor fil. (Endast bilder under 5mb)';
      }
    }
  }

  showSnackbarUpdateEvent() {
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === fromEvents.ActionTypes.UPDATE_EVENT_SUCCESS)).subscribe((action) => {
        this.snackBar.open('Evenemanget är nu uppdaterat', '', { duration: 2500 });
      })
    );

    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === fromEvents.ActionTypes.UPDATE_EVENT_ERROR)).subscribe((action) => {
        this.snackBar.open('Någonting gick fel, försök igen', '', { duration: 5000 });
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
