import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Office } from 'src/app/shared/models/dto/OfficeDto';


export const adapter: EntityAdapter<Office> = createEntityAdapter<Office>({
  selectId: (of: Office) => of.id,
});