import { EntityState } from "@ngrx/entity";

import { Drink, Price } from '../../../shared/models';

export interface DrinksState extends EntityState<Drink> {
    selectedDrinkId: number | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

