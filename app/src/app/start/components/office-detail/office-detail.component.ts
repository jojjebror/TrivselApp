import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, OnChanges } from '@angular/core';
import { Office, User } from 'src/app/shared/models';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as fromOffices from '../../state/offices';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import {
  EditOfficeInfoDialogModel,
  EditOfficeInfoDialogComponent,
} from 'src/app/shared/dialogs/editOfficeInfoDialog/editOfficeInfoDialog.component';

@Component({
  selector: 'ex-office-detail',
  templateUrl: './office-detail.component.html',
  styleUrls: ['./office-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficeDetailComponent implements OnDestroy, OnChanges {
  @Input() user: User;

  office$: Observable<Office>;
  subscription = new Subscription();

  constructor(private store$: Store<AppState>, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnChanges() {
    this.office$ = this.store$.pipe(select(fromOffices.getUserOffice(this.user.office)));
  }

  editOfficeInfoDialog(office: Office): void {
    const data = office;
    console.log(data);
    const dialogData = new EditOfficeInfoDialogModel(data);

    const dialogRef = this.dialog.open(EditOfficeInfoDialogComponent, {
      maxWidth: '600px',
      data: dialogData,
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult == true) {
          //this.showSnackbarEditOffice();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
