import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { User } from '../../../shared/models';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id
});
