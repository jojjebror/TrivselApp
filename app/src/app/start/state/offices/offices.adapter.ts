import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Office } from '../../../shared/models';

export const adapter: EntityAdapter<Office> = createEntityAdapter<Office>({
  selectId: (office: Office) => office.id,
});
