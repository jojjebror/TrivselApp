import { EntityState } from "@ngrx/entity";

import { Drink } from '../../../shared/models';

export interface DrinksState extends EntityState<Drink> {
    selectedDrinkId: number | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

