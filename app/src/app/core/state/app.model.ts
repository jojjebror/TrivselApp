// Core state
import { LayoutState } from './layout';
import { SessionState } from './session';

// Module state
import { ExampleState } from '../../admin/state';
import { EventState } from '../../event/state';
import { DrinkState } from '../../drink/state';
import { UserState } from '../../user/state';
import { HomeState } from '../../start/state'
import { ReceiptState } from '../../receipt/state';



/**
 * Main interface class for the application state. Contains the core state
 * and the modularized state, which is optional because of lazy loading.
 */
export interface AppState {
	
	layout: LayoutState;

	session: SessionState;

	example?: ExampleState;

	event?: EventState;
	
	drink?: DrinkState;

	user?: UserState;

	home?: HomeState;

	receipt?: ReceiptState;	
}