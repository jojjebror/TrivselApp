import { PricesState} from "./prices.model";

import { adapter} from "./prices.adapter";
import * as pricesActions from "./prices.actions";
import { PriceState } from "../price.model";


let initialState = adapter.getInitialState({
  selectedPriceId: null,
  loading: false,
  loaded: false,
  error: "",
});



export function reducer(
    state: PricesState = initialState,
    action: pricesActions.Actions
  ): PricesState {
    switch (action.type) {
      case pricesActions.ActionTypes.LOAD_PRICES_SUCCESS: {
        return adapter.addAll(action.payload, {
          ...state,
          loading: false,
          loaded: true,
          selectedPriceId: null,
        });
      }

      case pricesActions.ActionTypes.LOAD_PRICES_ERROR: {
          return {
              ...state,
              entities: {},
              loading: false,
              loaded: false,
              error: action.payload,
          };
      }
  
    default: {
      return state;
    }
  }
}