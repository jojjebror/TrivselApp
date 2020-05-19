import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { Event } from '../../../shared/models';
import { Observable, Subscription } from 'rxjs';

import { Store, select, ActionsSubject } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as fromEvents from '../../state/events';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, DateAdapter, MatDialog } from '@angular/material';
import { AlertService } from 'src/app/core/services/alert.service';

import { AuthenticationService } from 'src/app/core/services';
import { ActionTypes } from '../../state/events';
import { filter, map } from 'rxjs/operators';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/dialogs/confirmDialog/confirmDialog.component';
import { getLoadingData, getLoadingByKey } from '../../../core/state/loading';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'ex-event-list',
  templateUrl: './event-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription = new Subscription();
  loadings$ = this.store$.pipe(select(getLoadingData));
  evs$: Observable<Event[]>;
  userId: number;
  selectedTab: number = 0;
  selectedPage: number = 0;

  createdEvents = new MatTableDataSource<Event>();
  invitedEvents = new MatTableDataSource<Event>();
  attendedEvents = new MatTableDataSource<Event>();
  allEvents = new MatTableDataSource<Event>();

  displayedColumnsCreated = ['title', 'location', 'date', 'actions'];
  displayedColumnsInvited = ['title2', 'location2', 'date2', 'invited2', 'actions2'];
  displayedColumnsAttended = ['title3', 'location3', 'date3', 'invited3', 'actions3'];

  searchField;
  searchFieldUserEvents;
  calendarField;

  constructor(
    private store$: Store<AppState>,
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>,
    public alertService: AlertService,
    public authService: AuthenticationService,
    private actionsSubject$: ActionsSubject,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public breakpointObserver: BreakpointObserver

  ) {
    dateAdapter.setLocale('sv');
    this.subscription.add(
      this.authService.getUserId().subscribe((user) => {
        this.userId = user.sub;
      })
    );
    this.subscription.add(breakpointObserver.observe(['(max-width: 650px)']).subscribe((result) => {
      this.displayedColumnsCreated = result.matches ? ['title', 'date', 'actions'] : ['title', 'location', 'date', 'actions'];
      this.displayedColumnsInvited = result.matches ? ['title2', 'date2', 'actions2'] : ['title2', 'location2', 'date2', 'invited2', 'actions2'];
      this.displayedColumnsAttended = result.matches ? ['title3', 'date3', 'actions3'] : ['title3', 'location3', 'date3', 'invited3', 'actions3'];
    })
    );
  }

  ngOnInit() {
    this.loadParams();
    this.loadEvents();
  }

  private loadEvents() {
    this.store$.dispatch(new fromEvents.GetCurrentUserEvent(+this.userId));
    this.store$.dispatch(new fromEvents.LoadEvents());

    this.showSnackbarLoadEvents();

    //All events
    this.subscription.add(
      this.store$.pipe(select(fromEvents.getEvents)).subscribe((data: Event[]) => {
        this.allEvents.data = data;
      })
    );

    this.allEvents.paginator = this.paginator;
    this.evs$ = this.allEvents.connect();
    this.createdEvents.sort = this.sort;

    //Events that the user have created
    this.subscription.add(
      this.store$.pipe(select(fromEvents.getEventsCreatedByUser(+this.userId))).subscribe((data: Event[]) => {
        this.createdEvents.data = data;
      })
    );

    //Events that the user has been invited to
    this.subscription.add(
      this.store$.pipe(select(fromEvents.getInvitedEvents)).subscribe((data: Event[]) => {
        this.invitedEvents.data = data;
      })
    );

    //Events that the user already have attended to
    this.subscription.add(
      this.store$.pipe(select(fromEvents.getAttendedEvents)).subscribe((data: Event[]) => {
        this.attendedEvents.data = data.sort((a, b) => a.startDate.toString().localeCompare(b.startDate.toString()));
      })
    );
  }

  deleteEvent(id: number) {
    this.store$.dispatch(new fromEvents.DeleteEvent(id));
    this.showSnackbarDeleteEvent();
  }

  editEvent(id: number) {
    this.store$.dispatch(new fromEvents.LoadEditEvent(id));
  }

  updateParticpantsToEvent(id: number, answer: string) {
    var data = [id, +this.userId, answer];
    this.store$.dispatch(new fromEvents.UpdateUserParticipant(data));

    this.refreshData();
    this.showSnackbarUpdateParticipants(answer);
  }

  refreshData() {
    //Events created by logged in user
    this.subscription.add(
      this.store$.pipe(select(fromEvents.getEventsCreatedByUser(+this.userId))).subscribe((data: Event[]) => {
        this.createdEvents.data = data;
      })
    );

    //Events that the user has been invited to
    this.subscription.add(
      this.store$.pipe(select(fromEvents.getInvitedEvents)).subscribe((data: Event[]) => {
        this.invitedEvents.data = data;
      })
    );

    //Events that the user already have attended to
    this.subscription.add(
      this.store$.pipe(select(fromEvents.getAttendedEvents)).subscribe((data: Event[]) => {
        this.attendedEvents.data = data;
      })
    );
  }

  doFilter(filterValue: string, keyword: string) {
    if (keyword === 'createdEvents') {
      this.createdEvents.filter = filterValue.trim().toLocaleLowerCase();
    } else {
      this.allEvents.filter = filterValue.trim().toLocaleLowerCase();
    }
  }

  clearField(property: string) {
    switch (property) {
      case 'searchField': {
        this.searchField = '';
      }
      case 'searchFieldUserEvents': {
        this.searchFieldUserEvents = '';
      }
      case 'calendarField': {
        this.calendarField = '';
      }
    }

    if (property === 'searchFieldUserEvents') {
      this.doFilter('', 'createdEvents');
    } else {
      this.doFilter('', '');
    }
  }

  confirmDialog(id: number, title: string): void {
    const message = 'Vill du ta bort evenemanget ' + title + '?';
    const dialogData = new ConfirmDialogModel('Bekräfta', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult == true) {
          this.deleteEvent(id);
        }
      })
    );
  }

  getDayOfWeek(date: Date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null : ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'][dayOfWeek];
  }

  checkDates(startdate: Date, enddate: Date) {
    let startD = new Date(startdate);
    let endD = new Date(enddate);

    if (startD.toDateString() === endD.toDateString()) {
      return true;
    } else {
      return false;
    }
  }

  checkEndTime(enddate: Date) {
    let endD = new Date(enddate);

    if (endD.getHours() != 23 && endD.getMinutes() != 59) {
      return true;
    } else {
      return false;
    }
  }

  showSnackbarLoadEvents() {
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.GET_USER_EVENT_ERROR)).subscribe((action) => {
        this.snackBar.open('Evenemangen kunde inte laddas, försök igen', '', { duration: 10000 });
      })
    );

    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.LOAD_EVENTS_ERROR)).subscribe((action) => {
        this.snackBar.open('Evenemangen kunde inte laddas, försök igen', '', { duration: 10000 });
      })
    );
  }

  showSnackbarDeleteEvent() {
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.DELETE_EVENT_SUCCESS)).subscribe((action) => {
        this.snackBar.open('Evenemanget borttaget', '', { duration: 2500 });
        this.store$.dispatch(new fromEvents.GetCurrentUserEvent(+this.userId));
      })
    );
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.DELETE_EVENT_ERROR)).subscribe((action) => {
        this.snackBar.open('Någonting gick fel, försök igen', '', { duration: 5000 });
        this.loadEvents();
      })
    );
  }

  showSnackbarUpdateParticipants(answer: string) {
    this.subscription.add(
      this.actionsSubject$
        .pipe(filter((action: any) => action.type === ActionTypes.UPDATE_USER_PARTICIPANT_SUCCESS))
        .subscribe((action) => {
          if (answer == 'accepted') {
            this.snackBar.open('Du är tillagd i evenemanget', '', { duration: 2500 });
          }
          if (answer == 'declined') {
            this.snackBar.open('Du är borttagen ur evenemanget', '', { duration: 2500 });
          }
        })
    );

    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.UPDATE_USER_PARTICIPANT_ERROR)).subscribe((action) => {
        this.snackBar.open('Någonting gick fel, försök igen', '', { duration: 2500 });
      })
    );
  }

  loadParams() {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.selectedPage = params['page'];
        this.selectedTab = params['tab'];
      })
    );
  }

  onPaginateChange(event) {
    this.selectedPage = event.pageIndex;
  }

  onTabChange(tabId: number): void {
    this.selectedTab = tabId;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.allEvents) {
      this.allEvents.disconnect();
    }
  }
}
