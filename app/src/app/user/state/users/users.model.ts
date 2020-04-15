import { EntityState } from '@ngrx/entity';

import { User, Event } from '../../../shared/models';

export interface UsersState extends EntityState<User> {
  selectedUserId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
  user: User;
  //event: Event[];
  //offices: string[]
}
