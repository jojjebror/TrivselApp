import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../shared/models';
import { EditDialogComponent, EditDialogModel } from 'src/app/shared/components/editDialog/editDialog.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'ex-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() user: User;

  @Output() logout = new EventEmitter<any>();

  menuItems = [
    {
      title: 'Välkommen',
      icon: 'dashboard',
      route: ['/start']
    },
    {
      title: 'Exempel',
      icon: 'grade',
      route: ['/exempel']
    },
    {
      title: 'Evenemang',
      icon: 'grade',
      route: ['/event']
    },
    {
      title: 'Drycker',
      icon: 'grade',
      route: ['/drink']
    },
  ];

  constructor(public dialog: MatDialog) {}

  editDialog(): void {
    const message = 'Ändra tillhörande kontor';
    const dialogData = new EditDialogModel('Bekräfta', message);

    const dialogRef = this.dialog.open(EditDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

      dialogRef.afterClosed().subscribe((dialogResult) => {

      })
  }
}