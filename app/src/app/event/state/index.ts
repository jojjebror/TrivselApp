import { ActionReducerMap } from '@ngrx/store';

import * as fromEvents from './events';

import { EventState } from './event.model';

export { EventState } from './event.model';

export const effects = [fromEvents.EventsEffects];

export const reducers: ActionReducerMap<EventState> = {
  evs: fromEvents.reducer
};
