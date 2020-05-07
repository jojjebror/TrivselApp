import { ActionReducerMap } from '@ngrx/store';

import * as fromReceipts from './receipts';

import { ReceiptState } from './receipt.model'

export { ReceiptState } from './receipt.model';

export const effects = [fromReceipts.ReceiptsEffects];

export const reducers: ActionReducerMap<ReceiptState> = {
    res: fromReceipts.reducer
};