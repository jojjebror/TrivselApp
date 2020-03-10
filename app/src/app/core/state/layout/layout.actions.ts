import { Action } from '@ngrx/store';

export enum ActionTypes {
	ToggleMenu = '[Navbar] Toggle menu',
	HideMenu = '[Navbar] Hide menu'
}

export class ToggleMenu implements Action {
	readonly type = ActionTypes.ToggleMenu;
}

export class HideMenu implements Action {
	readonly type = ActionTypes.HideMenu;
}

export type Actions =
	ToggleMenu | HideMenu;