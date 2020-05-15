import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { AppState } from '../state';

import { User, Office } from '../../shared/models';
import { EditDialogComponent, EditDialogModel } from 'src/app/shared/dialogs/editDialog/editDialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import * as fromUsers from '../../user/state/users';
import { filter, take } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import * as fromOffices from '../../start/state/offices';

@Component({
  selector: 'ex-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() user: User;

  @Output() logout = new EventEmitter<any>();

  subscription = new Subscription();
  offices$: Observable<Office[]>;
  userOffice$: Observable<Office>;

  menuItems = [
    {
      title: 'Välkommen',
      icon: 'dashboard',
      route: ['/start'],
    },
    {
      title: 'Exempel',
      icon: 'grade',
      route: ['/exempel'],
    },
    {
      title: 'Evenemang',
      icon: 'grade',
      route: ['/event'],
    },
    {
      title: 'Drycker',
      icon: 'grade',
      route: ['/drink'],
    },
    {
      title: 'Kvitton',
      icon: 'grade',
      route: ['/drink/receipts'],
    },
  ];

  constructor(
    public dialog: MatDialog,
    private store$: Store<AppState>,
    private actionsSubject$: ActionsSubject,
    private snackBar: MatSnackBar
  ) {}

  loadOffices() {
    this.store$.dispatch(new fromOffices.LoadOffices());
    this.offices$ = this.store$.pipe(select(fromOffices.getOffices));
  }

  editDialog(user: User): void {
    this.loadOffices();
    let office = user.office;

    this.actionsSubject$
      .pipe(filter((action: any) => action.type === fromOffices.ActionTypes.LOAD_OFFICES_SUCCESS))
      .pipe(take(1))
      .subscribe(() => {
        this.userOffice$ = this.store$.pipe(select(fromOffices.getUserOffice(office)));

        let offices: Office[];
        let userOffice: Office;

        this.offices$.pipe(take(1)).subscribe((data) => {
          offices = data;
        });

        this.userOffice$.pipe(take(1)).subscribe((data) => {
          userOffice = data;
        });

        const message = 'Nedan har du möjlighet att ändra ditt nuvarande kontor. Ditt nuvarande kontor är ' + office;
        const dialogData = new EditDialogModel('Ändra tillhörande kontor', message, offices, userOffice);

        const dialogRef = this.dialog.open(EditDialogComponent, {
          maxWidth: '350px',
          data: dialogData,
        });

        dialogRef
          .afterClosed()
          .pipe(take(1))
          .subscribe((dialogResult) => {
            if (dialogResult == true) {
              this.editOffice(user.id, dialogData.userOffice);
            }
          });
      });
  }

  editOffice(userId: number, newOffice: Office) {
    let name = newOffice.name;
    var data = [userId, name];

    this.store$.dispatch(new fromUsers.UpdateOffice(data));

    this.actionsSubject$
      .pipe(filter((action: any) => action.type === fromUsers.ActionTypes.UPDATE_OFFICE_SUCCESS))
      .pipe(take(1))
      .subscribe(() => {
        this.snackBar.open('Ändring slutförd. Ditt valda kontor: ' + newOffice.name, '', { duration: 3500 });
      });
  }
}
