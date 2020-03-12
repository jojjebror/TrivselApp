// Core state
import { LayoutState } from './layout';
import { SessionState } from './session';

// Module state
import { ExampleState } from '../../example/state';
import { EventState } from '../../event/state';

/**
 * Main interface class for the application state. Contains the core state
 * and the modularized state, which is optional because of lazy loading.
 */
export interface AppState {
	
	layout: LayoutState;

	session: SessionState;

	example?: ExampleState;

	event?: EventState;
}