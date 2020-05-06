import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromSession from '../../core/state/session';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { ActionTypes } from '../../core/state/session';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/shared/models';
import { AppState } from 'src/app/core/state';
import { AddDialogComponent, AddDialogModel } from 'src/app/shared/components/addDialog/addDialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import * as fromUsers from '../../user/state/users';



@Component({
  selector: 'ex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  user$: Observable<User>;

  constructor(
    private store$: Store<AppState>,
    private actionsSubject$: ActionsSubject,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let currentUser: User;

    this.actionsSubject$.pipe(filter((action: any) => action.type === ActionTypes.SetUserSuccess)).subscribe((action) => {
      this.user$ = this.store$.pipe(select(fromSession.selectUser));
	  this.user$.subscribe((data) => (currentUser = data));

	  if (currentUser.office === null) {
      this.addOfficeDialog(currentUser);
    }

    });  
  }

  addOfficeDialog(user: User): void {
    var offices = ['Linköping', 'Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Örebro', 'Söderhamn', 'Borlänge', 'Helsingborg', 'Karlstad'];
    var office = user.office;
    const message = 'Välj det kontor du tillhör i listan nedan för att gå vidare till applikationen';
    const dialogData = new AddDialogModel('Välj ett kontor', message, offices, office);

    const dialogRef = this.dialog.open(AddDialogComponent, {
      maxWidth: '350px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult == true) {
        this.addOffice(user.id, dialogData.office);
      }
    });
  }

  addOffice(userId: number, newOffice: string) {
	var data = [userId, newOffice];
    this.store$.dispatch(new fromUsers.UpdateOffice(data));

    this.subscription.add(
      this.actionsSubject$
        .pipe(filter((action: any) => action.type === fromUsers.ActionTypes.UPDATE_OFFICE_SUCCESS))
        .subscribe((action) => {
          this.snackBar.open('Ditt valda kontor: ' + newOffice, '', { duration: 3500 });
        })
    ); 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}