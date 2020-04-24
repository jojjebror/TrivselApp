import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Price} from '../../../shared/models';

export const adapter: EntityAdapter<Price> = createEntityAdapter<Price>({
    selectId: (pr: Price) => pr.id,
  });
  