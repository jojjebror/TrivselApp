import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, OnChanges } from '@angular/core';
import { Office, User } from 'src/app/shared/models';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as fromOffices from '../../state/offices';
import * as fromUsers from '../../../user/state/users';
import * as fromSession from '../../../core/state/session';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditOfficeInfoDialogModel, EditOfficeInfoDialogComponent } from 'src/app/shared/dialogs/editOfficeInfoDialog/editOfficeInfoDialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ex-office-detail',
  templateUrl: './office-detail.component.html',
  styleUrls: ['./office-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficeDetailComponent implements OnDestroy, OnChanges {
  @Input() user: User;

  office$: Observable<Office>;
  users$: Observable<User[]>;
  subscription = new Subscription();

  constructor(private store$: Store<AppState>, public dialog: MatDialog, private snackBar: MatSnackBar, private actionsSubject$: ActionsSubject) {}

  ngOnChanges() {
    this.store$.dispatch(new fromUsers.GetUsers());
    this.office$ = this.store$.pipe(select(fromOffices.getUserOffice(this.user.office)));
    this.users$ = this.store$.pipe(select(fromUsers.getUsersInOffice(this.user.office)));
  }

  editOfficeInfoDialog(office: Office): void {
    const data = office;
    const dialogData = new EditOfficeInfoDialogModel(data);

    const dialogRef = this.dialog.open(EditOfficeInfoDialogComponent, {
      maxWidth: '600px',
      data: dialogData,
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult == true) {
          this.showSnackbarEditOfficeInfo(office.name);
        }
      })
    );
  }

  showSnackbarEditOfficeInfo(office: string) {
    this.subscription.add(
      this.actionsSubject$.pipe(filter((action: any) => action.type === fromOffices.ActionTypes.UPDATE_OFFICE_SUCCESS)).subscribe((action) => {
        this.snackBar.open(office + 's information uppdaterades', '', { duration: 3000 });
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
