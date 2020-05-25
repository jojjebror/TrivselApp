import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { User } from '../../../shared/models';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  sortComparer: sortByName
});

export function sortByName(a: { name: string }, b: { name: string }): number {
  return a.name.localeCompare(b.name);
}