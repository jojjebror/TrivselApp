import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Receipt } from '../../../shared/models';

export const adapter: EntityAdapter<Receipt> = createEntityAdapter<Receipt>({
    selectId: (re: Receipt) => re.id,
  });