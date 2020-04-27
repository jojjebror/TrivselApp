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

  SAVE_IMAGE = '[Drinks view] Save Image',
  SAVE_IMAGE_SUCCESS = '[API: /drink] Save Image success',
  SAVE_IMAGE_ERROR = '[API: /drink] Save Image error',

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

  constructor(public payload: Update<Drink>) {
    console.log('Save Image Success ' + payload);
  }
}

export class SaveImageError implements Action {
  readonly type = ActionTypes.SAVE_IMAGE_ERROR;

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

  constructor(public payload: Drink) {}
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

  | SaveImage
  | SaveImageSuccess
  | SaveImageError;