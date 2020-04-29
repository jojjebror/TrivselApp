import { EntityState } from "@ngrx/entity";


import { Receipt } from '../../../shared/models';

export interface ReceiptsState extends EntityState<Receipt> {
    selectedReceiptId: number | null;
    loading: boolean;
    loaded: boolean;
    error: string;
    
}