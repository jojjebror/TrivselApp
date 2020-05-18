import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take, map } from 'rxjs/operators';

import { AuthenticationService } from '../services';
import * as fromSession from '../../../app/core/state/session';
import { User } from 'src/app/shared/models';
import { Store, select } from '@ngrx/store';
import { AppState } from '../state';

@Injectable()
export class RoleGuard implements CanActivate {
  isAdmin: boolean = false;

  constructor(private router: Router, private authenticationService: AuthenticationService, private store$: Store<AppState>) {}

  canActivate(): boolean {
    this.store$.pipe(take(1), select(fromSession.selectUser)).subscribe((data: User) => {
      this.isAdmin = data.admin;
    });
    if (!this.isAdmin) this.router.navigate(['/event']);
    return this.isAdmin;
  }
}
