import { EntityState } from '@ngrx/entity';

import { Event, User, Post } from '../../../shared/models';

export interface EventsState extends EntityState<Event> {
  selectedEventId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
  users: User[];
  posts: Post[];
  userEvents: Event[];
}
