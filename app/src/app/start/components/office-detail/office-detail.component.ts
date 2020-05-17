import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Office, User } from 'src/app/shared/models';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import * as fromOffices from '../../state/offices';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-office-detail',
  templateUrl: './office-detail.component.html',
  styleUrls: ['./office-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficeDetailComponent implements OnInit {
  @Input() user: User;
  office$: Observable<Office>

  constructor(private store$: Store<AppState>) {}

  ngOnInit() {
    this.office$ = this.store$.pipe(select(fromOffices.getUserOffice(this.user.office)));
  }
}
