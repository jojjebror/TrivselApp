import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../../shared/models';

import { AppState } from '../state';
import * as fromLayout from '../state/layout';
import * as fromSession from '../state/session';
import * as fromAuthentication from '../state/authentication';

@Component({
  selector: 'ex-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit {
  user$: Observable<User>;

  isMenuVisible$: Observable<boolean>;
  initialized$: Observable<boolean>;

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
  this.user$ = this.store$.select(fromSession.selectUser);
  this.initialized$ = this.store$.select(fromSession.selectInitialized);
  this.isMenuVisible$ = this.store$.select(fromLayout.selectMenuVisible);
  }

  toggleMenu(): void {
    this.store$.dispatch(new fromLayout.ToggleMenu());
  }

  logout(): void {
    this.store$.dispatch(new fromAuthentication.Logout());
  }
}