import { EntityState } from "@ngrx/entity";

import { Price } from '../../../shared/models';


export interface PricesState extends EntityState<Price> {
    selectedPriceId: number | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}