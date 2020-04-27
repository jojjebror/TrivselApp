import { Action } from '@ngrx/store';
import { MatSnackBarConfig } from '@angular/material';


export enum ActionTypes {
  ToggleMenu = '[Navbar] Toggle menu',
  HideMenu = '[Navbar] Hide menu',
  SNACKBAR_OPEN = '[Snackbar] Open snackbar',
  SNACKBAR_CLOSE = '[Snackbar] Close snackbar',
}

export class ToggleMenu implements Action {
  readonly type = ActionTypes.ToggleMenu;
}

export class HideMenu implements Action {
  readonly type = ActionTypes.HideMenu;
}

export class SnackbarOpen implements Action {
  readonly type = ActionTypes.SNACKBAR_OPEN;

  constructor(
    public payload: {
      message: string;
      action?: string;
      config?: MatSnackBarConfig;
    }
  ) {}
}
export class SnackbarClose implements Action {
  readonly type = ActionTypes.SNACKBAR_CLOSE;
}

export type Actions = ToggleMenu | HideMenu | SnackbarOpen | SnackbarClose;
