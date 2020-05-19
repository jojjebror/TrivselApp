import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Event } from '../../../shared/models';

export const adapter: EntityAdapter<Event> = createEntityAdapter<Event>({
  sortComparer: sortByStartDate,
});

export function sortByStartDate(a: Event, b: Event): number {
  return a.startDate.toString().localeCompare(b.startDate.toString());
}