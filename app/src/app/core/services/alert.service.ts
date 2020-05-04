import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AlertComponent } from '../components/alert/alert.component';

@Injectable()
export class AlertService {
  constructor(private matSnackBar: MatSnackBar) {}

  showError(message: string): void {
    this.show(message, 'error');
  }

  showSuccess(message: string): void {
    this.show(message, 'success');
  }

  private show(message: string, className: string): void {
    this.matSnackBar.openFromComponent(AlertComponent, {
      duration: 5000,
      panelClass: className,
      data: { message: message },
    });
  }
}
