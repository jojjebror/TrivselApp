import { Action } from "@ngrx/store";

import { Update } from "@ngrx/entity";
import { Receipt } from "../../../shared/models";

export enum ActionTypes {

    LOAD_RECEIPTS = "[Receipts view] Load Receipts",
    LOAD_RECEIPTS_SUCCESS = "[API: /receipts] Load Receipts success",
    LOAD_RECEIPTS_ERROR = "[API: /receipts] Load Receipts error",

    LOAD_USER_RECEIPTS ="[Receipts view] Load User Receipts",
    LOAD_USER_RECEIPTS_SUCCESS ="[API: /receipts] Load User Receipts success",
    LOAD_USER_RECEIPTS_ERROR ="[Receipts view] Load User Receipts error",

    UPLOAD_IMAGE = '[Receipts view] Save Image',
    UPLOAD_IMAGE_SUCCESS = '[API: /receipts] Save Image success',
    UPLOAD_IMAGE_ERROR = '[API: /receipts] Save Image error',

    UPDATE_IMAGE = '[Receipts view] Update Image',
    UPDATE_IMAGE_SUCCESS = '[API: /receipts] Update Image success',
    UPDATE_IMAGE_ERROR = '[API: /receipts] Update Image error',
    
    CREATE_RECEIPT_SUCCESS = '[API: /receipts] Create Receipt success',
    CREATE_RECEIPT_ERROR = '[API: /receipts] Create Receipt error',
    CREATE_RECEIPT = '[Receipts view] Create Receipt ',

    DELETE_RECEIPT = '[Receipts view] Delete Receipt',
    DELETE_RECEIPT_SUCCESS = '[API: /receipts] Delete Receipt success',
    DELETE_RECEIPT_ERROR = '[API: /receipts] Delete Receipt error',
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

  
/*--------------LoadUserReceipts--------------*/

  export class LoadUserReceipts implements Action {
    readonly type = ActionTypes.LOAD_USER_RECEIPTS;
  
    constructor(public payload: number) {}
  }
  
  export class LoadUserReceiptsSuccess implements Action {
    readonly type = ActionTypes.LOAD_USER_RECEIPTS_SUCCESS;
  
    constructor(public payload: Receipt[]) {}
  }
  
  export class LoadUserReceiptsError implements Action {
    readonly type = ActionTypes.LOAD_USER_RECEIPTS_ERROR;
  
    constructor(public payload: string) {}
  } 

/*--------------UploadImage--------------*/

export class UploadImage implements Action {
  readonly type = ActionTypes.UPLOAD_IMAGE;

  constructor(public id: number, public image: File) {}
}

export class UploadImageSuccess implements Action {
  readonly type = ActionTypes.UPLOAD_IMAGE_SUCCESS;

  constructor(public payload: Update<Receipt>) {}
}

export class UploadImageError implements Action {
  readonly type = ActionTypes.UPLOAD_IMAGE_ERROR;

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
  
  
/*--------------RemoveReceipt--------------*/

export class DeleteReceipt implements Action {
  readonly type = ActionTypes.DELETE_RECEIPT;

  constructor(public payload: number) {}
}

export class DeleteReceiptSuccess implements Action {
  readonly type = ActionTypes.DELETE_RECEIPT_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteReceiptError implements Action {
  readonly type = ActionTypes.DELETE_RECEIPT_ERROR;

  constructor(public payload: string) {}
}
  

export type Actions = 
    | LoadReceipts
    | LoadReceiptsSuccess
    | LoadReceiptsError

    | UploadImage
    | UploadImageSuccess
    | UploadImageError
    
    | CreateReceipt
    | CreateReceiptError
    | CreateReceiptSuccess

    | DeleteReceipt
    | DeleteReceiptSuccess
    | DeleteReceiptError

    | LoadUserReceipts
    | LoadUserReceiptsSuccess
    | LoadUserReceiptsError

    | DeleteReceipt
    | DeleteReceiptSuccess
    | DeleteReceiptError;
  