import { EntityState } from '@ngrx/entity';

import { Event, User } from '../../../shared/models';

export interface EventsState extends EntityState<Event> {
  selectedEventId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
  users: User[];
  userEvents: Event[];
}
