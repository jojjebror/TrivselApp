import { Action } from "@ngrx/store";

import { Update } from "@ngrx/entity";
import { Price } from "../../../shared/models";


export enum ActionTypes {
    LOAD_PRICES = "[Drinks view] Load Prices",
    LOAD_PRICES_SUCCESS = "[API: /drink] Load Prices success",
    LOAD_PRICES_ERROR = "[API: /drink] Load Prices error",
}
/*--------------LoadPrices-------------*/
export class LoadPrices implements Action {
    readonly type = ActionTypes.LOAD_PRICES;
    constructor(public payload: string) {}
  }
  
  export class LoadPricesSuccess implements Action {
    readonly type = ActionTypes.LOAD_PRICES_SUCCESS;
  
    constructor(public payload: Price[]) {}
  }
  
  export class LoadPricesError implements Action {
    readonly type = ActionTypes.LOAD_PRICES_ERROR;
  
    constructor(public payload: string) {}
  }
  


  export type Actions =
  | LoadPricesError
  | LoadPricesSuccess
  | LoadPrices;