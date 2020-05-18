import { EntityState } from '@ngrx/entity';

import { Office } from '../../../shared/models';

export interface OfficesState extends EntityState<Office> {
  selectedOfficeId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
}
