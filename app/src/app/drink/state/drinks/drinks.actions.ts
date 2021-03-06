import { Action } from "@ngrx/store";

import { Update } from "@ngrx/entity";
import { Drink} from "../../../shared/models";


export enum ActionTypes {

  LOAD_DRINKS = "[Drinks view] Load Drinks",
  LOAD_DRINKS_SUCCESS = "[API: /drink] Load Drinks success",
  LOAD_DRINKS_ERROR = "[API: /drink] Load Drinks error",
  
  LOAD_DRINK = "[Drinks view] Load Drink",
  LOAD_DRINK_SUCCESS = "[API: /drink] Load Drink success",
  LOAD_DRINK_ERROR = "[API: /drink] Load Drink error",

  CREATE_DRINK = "[Drinks view] Create Drink",
  CREATE_DRINK_SUCCESS = "[API: /drink] Create Drink success",
  CREATE_DRINK_ERROR = "[API: /drink] Create Drink error",

  UPDATE_DRINK = "[Drinks view] Update Drink",
  UPDATE_DRINK_SUCCESS = "[API: /drink] Update Drink success",
  UPDATE_DRINK_ERROR = "[API: /drink] Update Drink error",

  DELETE_DRINK = "[Drinks view] Delete Drink",
  DELETE_DRINK_SUCCESS = "[API: /drink] Delete Drink success",
  DELETE_DRINK_ERROR = "[API: /drink] Delete Drink error",

  FILTER_DRINK = "[Drinks view] Filter Drink",
  FILTER_DRINK_SUCCESS = "[API: /drink] Filter Drink success",
  FILTER_DRINK_ERROR = "[API: /drink] Filter Drink error",

  UPLOAD_IMAGE = '[Drinks view] Upload Image',
  UPLOAD_IMAGE_SUCCESS = '[API: /drink] Upload Image success',
  UPLOAD_IMAGE_ERROR = '[API: /drink] Upload Image error',

  UPDATE_IMAGE = '[Drinks view] Update Image',
  UPDATE_IMAGE_SUCCESS = '[API: /drink] Update Image success',
  UPDATE_IMAGE_ERROR = '[API: /drink] Update Image error',


}


/*--------------UploadImage--------------*/

export class UploadImage implements Action {
  readonly type = ActionTypes.UPLOAD_IMAGE;

  constructor(public id: number, public image: File) {}
}

export class UploadImageSuccess implements Action {
  readonly type = ActionTypes.UPLOAD_IMAGE_SUCCESS;

  constructor(public payload: Update<Drink>) {}
}

export class UploadImageError implements Action {
  readonly type = ActionTypes.UPLOAD_IMAGE_ERROR;

  constructor(public payload: string) {}
}


/*--------------LoadAllDrinks--------------*/

export class LoadDrinks implements Action {
  readonly type = ActionTypes.LOAD_DRINKS;
}

export class LoadDrinksSuccess implements Action {
  readonly type = ActionTypes.LOAD_DRINKS_SUCCESS;

  constructor(public payload: Drink[]) {}
}

export class LoadDrinksError implements Action {
  readonly type = ActionTypes.LOAD_DRINKS_ERROR;

  constructor(public payload: string) {}
}

/*--------------LoadDrink--------------*/

export class LoadDrink implements Action {
  readonly type = ActionTypes.LOAD_DRINK;

  constructor(public payload: number) {}
}

export class LoadDrinkSuccess implements Action {
  readonly type = ActionTypes.LOAD_DRINK_SUCCESS;

  constructor(public payload: Drink) {}
}

export class LoadDrinkError implements Action {
  readonly type = ActionTypes.LOAD_DRINK_ERROR;

  constructor(public payload: string) {}
}

/*--------------CreateDrink--------------*/

export class CreateDrink implements Action {
  readonly type = ActionTypes.CREATE_DRINK;

  constructor(public payload: Drink, public image: File) {}
}

export class CreateDrinkSuccess implements Action {
  readonly type = ActionTypes.CREATE_DRINK_SUCCESS;

  constructor(public payload: Drink) {}
}

export class CreateDrinkError implements Action {
  readonly type = ActionTypes.CREATE_DRINK_ERROR;

  constructor(public payload: string) {}
}

/*--------------UpdateDrink--------------*/

export class UpdateDrink implements Action {
  readonly type = ActionTypes.UPDATE_DRINK;

  constructor(public payload: Drink, public image: File) {}
}

export class UpdateDrinkSuccess implements Action {
  readonly type = ActionTypes.UPDATE_DRINK_SUCCESS;

  constructor(public payload: Update<Drink>) {}
}

export class UpdateDrinkError implements Action {
  readonly type = ActionTypes.UPDATE_DRINK_ERROR;

  constructor(public payload: string) {}
}

/*--------------RemoveDrink--------------*/

export class DeleteDrink implements Action {
  readonly type = ActionTypes.DELETE_DRINK;

  constructor(public payload: number) {}
}

export class DeleteDrinkSuccess implements Action {
  readonly type = ActionTypes.DELETE_DRINK_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteDrinkError implements Action {
  readonly type = ActionTypes.DELETE_DRINK_ERROR;

  constructor(public payload: string) {}
}

export class FilterDrink implements Action {
  readonly type = ActionTypes.FILTER_DRINK;

  constructor(public payload: string) {}
}

export class FilterDrinkSuccess implements Action {
  readonly type = ActionTypes.FILTER_DRINK_SUCCESS;
  constructor(public payload: Drink[]) {}
}

export class FilterDrinkError implements Action {
  readonly type = ActionTypes.FILTER_DRINK_ERROR;
  constructor(public payload: string) {}
}

export type Actions =
  | LoadDrinks
  | LoadDrinksSuccess
  | LoadDrinksError

  | LoadDrink
  | LoadDrinkSuccess
  | LoadDrinkError

  | CreateDrink
  | CreateDrinkSuccess
  | CreateDrinkError

  | UpdateDrink
  | UpdateDrinkSuccess
  | UpdateDrinkError

  | DeleteDrink
  | DeleteDrinkSuccess
  | DeleteDrinkError

  | FilterDrink
  | FilterDrinkError
  | FilterDrinkSuccess

  | LoadDrink
  | LoadDrinkError
  | LoadDrinkSuccess

  | UploadImage
  | UploadImageSuccess
  | UploadImageError;