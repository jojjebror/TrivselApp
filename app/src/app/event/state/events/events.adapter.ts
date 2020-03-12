import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Event } from '../../../shared/models';

export const adapter: EntityAdapter<Event> = createEntityAdapter<Event>({
  selectId: (ev: Event) => ev.id
});
