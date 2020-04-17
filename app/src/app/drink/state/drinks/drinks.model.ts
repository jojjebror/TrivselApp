import { EntityState } from "@ngrx/entity";

import { Drink, PriceClass } from '../../../shared/models';

export interface DrinksState extends EntityState<Drink> {
    selectedDrinkId: number | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export interface PriceClassState extends EntityState<PriceClass> {
    selectedPriceId: number | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}