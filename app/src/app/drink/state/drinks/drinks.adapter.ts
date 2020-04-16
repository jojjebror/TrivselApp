import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Drink, PriceClass } from '../../../shared/models';

export const adapter: EntityAdapter<Drink> = createEntityAdapter<Drink>({
  selectId: (dr: Drink) => dr.id
});

