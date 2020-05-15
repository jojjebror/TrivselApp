import { EntityState } from '@ngrx/entity';

import { Example } from '../../../shared/models';

export interface ExamplesState extends EntityState<Example> {
	loading: boolean;
}