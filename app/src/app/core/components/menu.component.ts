import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { AppState } from '../state';

import { User } from '../../shared/models';
import { EditDialogComponent, EditDialogModel } from 'src/app/shared/components/editDialog/editDialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import * as fromUsers from '../../user/state/users';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
//import { ActionTypes } from '../../user/state/users';

@Component({
  selector: 'ex-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnDestroy {
  @Input() user: User;

  @Output() logout = new EventEmitter<any>();

  subscription = new Subscription();

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
      route: ['/drink']
    },
    {
      title: 'Kvitton',
      icon: 'grade',
      route: ['/drink/receipts']
    }
  ];

  constructor(
    public dialog: MatDialog,
    private store$: Store<AppState>,
    private actionsSubject$: ActionsSubject,
    private snackBar: MatSnackBar
  ) {}

  editDialog(user: User): void {
    var offices = ['Linköping', 'Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Örebro', 'Söderhamn', 'Borlänge', 'Helsingborg', 'Karlstad'];
    var office = user.office;
    const message = 'Nedan har du möjlighet att ändra ditt nuvarande kontor. Ditt nuvarande kontor är ' + office;
    const dialogData = new EditDialogModel('Ändra tillhörande kontor', message, offices, office);

    const dialogRef = this.dialog.open(EditDialogComponent, {
      maxWidth: '350px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult == true) {
        this.editOffice(user.id, dialogData.office);
      }
    });
  }

  editOffice(userId: number, newOffice: string) {
    var data = [userId, newOffice];
    this.store$.dispatch(new fromUsers.UpdateOffice(data));

    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === fromUsers.ActionTypes.UPDATE_OFFICE_SUCCESS)).subscribe((action) => {
        this.snackBar.open('Ändring slutförd. Ditt valda kontor: ' + newOffice, '', { duration: 3500 });
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}