import { Component, Input, ChangeDetectionStrategy, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { MatSnackBar, MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { AuthenticationService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromEvents from '../../../event/state/events';
import * as fromUsers from '../../../user/state/users';
import * as fromOffices from '../../../start/state/offices';
import { Event, Office, User } from '../../../shared/models';
import { Subscription, Observable } from 'rxjs';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/dialogs/confirmDialog/confirmDialog.component';
import { EditOfficeDetailsDialogModel, EditOfficeDetailsDialogComponent } from 'src/app/shared/dialogs/editOfficeDetailsDialog/editOfficeDetailsDialog.component';
import { NewOfficeDialogComponent, NewOfficeDialogModel } from 'src/app/shared/dialogs/newOfficeDialog/newOfficeDialog.component';
import { filter } from 'rxjs/operators';


//import { Example } from '../../../shared/models';

@Component({
  selector: 'ex-admin-list',
  templateUrl: './admin-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  private subscription = new Subscription();
  displayedColumnsEvents = ['title', 'location', 'date', 'actions'];
  displayedColumnsOffices = ['office', 'adress', 'swish', 'actions'];
  displayedColumnsUsers = ['name', 'admin', 'actions'];

  events = new MatTableDataSource<Event>();
  offices = new MatTableDataSource<Office>();
  users = new MatTableDataSource<User>();

  searchFieldEvents;
  searchFieldUsers;

  constructor(
    private store$: Store<AppState>,
    private snackBar: MatSnackBar,
    public authService: AuthenticationService,
    private actionsSubject$: ActionsSubject,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.loadEvents();
    this.loadOffices();
    this.loadUsers();
  }

  loadEvents() {
    this.store$.dispatch(new fromEvents.LoadEvents());

    this.subscription.add(
      this.store$.pipe(select(fromEvents.getEvents)).subscribe((data: Event[]) => {
        this.events.data = data;
      })
    );
  }

  loadOffices() {
    this.store$.dispatch(new fromOffices.LoadOffices());

    this.subscription.add(
      this.store$.pipe(select(fromOffices.getOffices)).subscribe((data: Office[]) => {
        this.offices.data = data;
      })
    );
  }

  loadUsers() {
    this.store$.dispatch(new fromUsers.GetUsers());

    this.subscription.add(
      this.store$.pipe(select(fromUsers.getUsers)).subscribe((data: User[]) => {
        this.users.data = data;
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

  deleteUser(id: number) {
    this.store$.dispatch(new fromUsers.DeleteUser(id));
    this.showSnackbarDeleteUser();
  }

  confirmDeleteEventDialog(id: number, title: string): void {
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

  confirmDeleteUserDialog(user: User): void {
    const message = 'Vill du ta bort användaren ' + user.name + '?';
    const dialogData = new ConfirmDialogModel('Bekräfta', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult == true) {
          this.deleteUser(user.id);
        }
      })
    );
  }

  addOfficeDialog(): void {
    const dialogData = new NewOfficeDialogModel();

    const dialogRef = this.dialog.open(NewOfficeDialogComponent, {
      maxWidth: '600px',
      data: dialogData,
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult == true) {
          this.showSnackbarAddOffice();
        }
      })
    );
  }

  editOfficeDetailsDialog(office: Office): void {
    const data = office;
    const dialogData = new EditOfficeDetailsDialogModel(data);

    const dialogRef = this.dialog.open(EditOfficeDetailsDialogComponent, {
      maxWidth: '600px',
      data: dialogData,
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult == true) {
          this.showSnackbarEditOffice();
        }
      })
    );
  }

  doFilter(filterValue: string, keyword: string) {
    if (keyword === 'events') {
      this.events.filter = filterValue.trim().toLocaleLowerCase();
    } else {
      this.users.filter = filterValue.trim().toLocaleLowerCase();
    }
  }

  clearField() {
    this.searchFieldEvents = '';
    this.searchFieldUsers = '';
  }

  updateAdminStatus(user: User) {
    let result: string;
    user.admin = !user.admin;

    if (user.admin == true) {
      result = 'true';
    } else {
      result = 'false';
    }

    var data = [user.id, result];

    this.store$.dispatch(new fromUsers.UpdateAdminStatus(data));
    this.showSnackbarUpdateAdmin(user.name);
  }

  showSnackbarDeleteEvent() {
    this.subscription.add(
      this.actionsSubject$
        .pipe(filter((action: any) => action.type === fromEvents.ActionTypes.DELETE_EVENT_SUCCESS))
        .subscribe((action) => {
          this.snackBar.open('Evenemanget borttaget', '', { duration: 2500 });
        })
    );
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === fromEvents.ActionTypes.DELETE_EVENT_ERROR)).subscribe((action) => {
        this.snackBar.open('Någonting gick fel, försök igen', '', { duration: 5000 });
      })
    );
  }

  showSnackbarDeleteUser() {
    this.subscription.add(
      this.actionsSubject$
        .pipe(filter((action: any) => action.type === fromUsers.ActionTypes.DELETE_USER_SUCCESS))
        .subscribe((action) => {
          this.snackBar.open('Användaren borttagen', '', { duration: 2500 });
        })
    );
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === fromUsers.ActionTypes.DELETE_USER_ERROR)).subscribe((action) => {
        this.snackBar.open('Någonting gick fel, försök igen', '', { duration: 5000 });
      })
    );
  }

  showSnackbarAddOffice() {
    this.subscription.add(
      this.actionsSubject$
        .pipe(filter((action: any) => action.type === fromOffices.ActionTypes.CREATE_OFFICE_SUCCESS))
        .subscribe((action) => {
          this.snackBar.open('Kontoret lades till framgångsrikt', '', { duration: 2500 });
        })
    );
    this.subscription.add(
      this.actionsSubject$
        .pipe(filter((action: any) => action.type === fromOffices.ActionTypes.CREATE_OFFICE_ERROR))
        .subscribe((action) => {
          this.snackBar.open('Någonting gick fel, försök igen', '', { duration: 5000 });
        })
    );
  }

  showSnackbarEditOffice() {
    this.subscription.add(
      this.actionsSubject$
        .pipe(filter((action: any) => action.type === fromOffices.ActionTypes.UPDATE_OFFICE_SUCCESS))
        .subscribe((action) => {
          this.snackBar.open('Kontoret ändrades framgångsrikt', '', { duration: 2500 });
        })
    );
    this.subscription.add(
      this.actionsSubject$
        .pipe(filter((action: any) => action.type === fromOffices.ActionTypes.UPDATE_OFFICE_ERROR))
        .subscribe((action) => {
          this.snackBar.open('Någonting gick fel, försök igen', '', { duration: 5000 });
        })
    );
  }

  showSnackbarUpdateAdmin(userName: string) {
    this.subscription.add(
      this.actionsSubject$
        .pipe(filter((action: any) => action.type === fromUsers.ActionTypes.UPDATE_ADMIN_STATUS_SUCCESS))
        .subscribe((action) => {
          this.snackBar.open(userName + 's behörighet ändrades framgångsrikt', '', { duration: 2500 });
        })
    );
    this.subscription.add(
      this.actionsSubject$
        .pipe(filter((action: any) => action.type === fromUsers.ActionTypes.UPDATE_ADMIN_STATUS_ERROR))
        .subscribe((action) => {
          this.snackBar.open('Någonting gick fel, försök igen', '', { duration: 5000 });
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
