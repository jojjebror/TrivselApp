import { ActionReducerMap } from '@ngrx/store';

import * as fromUsers from './users';

import { UserState } from './user.model';

export { UserState } from './user.model';

export const effects = [fromUsers.UsersEffects];

export const reducers: ActionReducerMap<UserState> = {
  users: fromUsers.reducer
};
