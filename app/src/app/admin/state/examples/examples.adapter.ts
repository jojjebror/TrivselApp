import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Example } from '../../../shared/models';

export const adapter: EntityAdapter<Example> = createEntityAdapter<Example>({
	selectId: (example: Example) => example.id
});