import { Action } from "@ngrx/store";

import { Update } from "@ngrx/entity";
import { Receipt } from "../../../shared/models";

export enum ActionTypes {

    LOAD_RECEIPTS = "[Drinks view] Load Receipts",
    LOAD_RECEIPTS_SUCCESS = "[API: /drink] Load Receipts success",
    LOAD_RECEIPTS_ERROR = "[API: /drink] Load Receipts error",

    SAVE_IMAGE = '[Drinks view] Save Image',
    SAVE_IMAGE_SUCCESS = '[API: /drink] Save Image success',
    SAVE_IMAGE_ERROR = '[API: /drink] Save Image error',

    UPDATE_IMAGE = '[Drinks view] Update Image',
    UPDATE_IMAGE_SUCCESS = '[API: /drink] Update Image success',
    UPDATE_IMAGE_ERROR = '[API: /drink] Update Image error',
    
    CREATE_RECEIPT_SUCCESS = '[API: /drink] Create Receipt success',
    CREATE_RECEIPT_ERROR = '[API: /drink] Create Receipt error',
    CREATE_RECEIPT = '[API: /drink] Create Receipt ',
}

/*--------------LoadAllReceipts--------------*/

export class LoadReceipts implements Action {
    readonly type = ActionTypes.LOAD_RECEIPTS;
  }
  
  export class LoadReceiptsSuccess implements Action {
    readonly type = ActionTypes.LOAD_RECEIPTS_SUCCESS;
  
    constructor(public payload: Receipt[]) {}
  }
  
  export class LoadReceiptsError implements Action {
    readonly type = ActionTypes.LOAD_RECEIPTS_ERROR;
  
    constructor(public payload: string) {}
  }
/*--------------SaveImage--------------*/

export class SaveImage implements Action {
    readonly type = ActionTypes.SAVE_IMAGE;
  
    constructor(public id: number, public payload: File) {
      console.log("Save Image " + id + " " + payload)
    }
  }
  export class SaveImageSuccess implements Action {
    readonly type = ActionTypes.SAVE_IMAGE_SUCCESS;
  
    constructor(public payload: Update<Receipt>) {
      console.log('Save Image Success ' + payload);
    }
  }
  
  export class SaveImageError implements Action {
    readonly type = ActionTypes.SAVE_IMAGE_ERROR;
  
    constructor(public payload: string) {}
  }

  /*--------------CreateReceipt--------------*/

export class CreateReceipt implements Action {
    readonly type = ActionTypes.CREATE_RECEIPT
  
    constructor(public payload: Receipt, public image: File) {}
  }
  
  export class CreateReceiptSuccess implements Action {
    readonly type = ActionTypes.CREATE_RECEIPT_SUCCESS;
  
    constructor(public payload: Receipt) {}
  }
  
  export class CreateReceiptError implements Action {
    readonly type = ActionTypes.CREATE_RECEIPT_ERROR;
  
    constructor(public payload: string) {}
  }
  
  

export type Actions = 
    | LoadReceipts
    | LoadReceiptsSuccess
    | LoadReceiptsError

    | SaveImage
    | SaveImageSuccess
    | SaveImageError
    
    |CreateReceipt
    |CreateReceiptError
    |CreateReceiptSuccess;