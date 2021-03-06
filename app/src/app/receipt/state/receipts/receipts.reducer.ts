import { ReceiptsState} from "./receipts.model";

import { adapter} from "./receipts.adapter";
import * as receiptsActions from "./receipts.actions";
import { ReceiptState } from "../receipt.model";


let initialState = adapter.getInitialState({
    selectedReceiptId: null,
    loading: false,
    loaded: false,
    error: "",
  });

  export function reducer(
    state: ReceiptsState = initialState,
    action: receiptsActions.Actions
  ): ReceiptsState {
    switch (action.type) {
      case receiptsActions.ActionTypes.LOAD_RECEIPTS_SUCCESS: {
        return adapter.addAll(action.payload, {
          ...state,
          loading: false,
          loaded: true,
        });
      }
      case receiptsActions.ActionTypes.LOAD_RECEIPTS: {
        return {
          ...state,
          loading: true,
          loaded: false
        };
      }

      case receiptsActions.ActionTypes.LOAD_RECEIPTS_ERROR: {
        return {
          ...state,
          entities: {},
          loading: false,
          loaded: false,
          error: action.payload,
        };
      }

      case receiptsActions.ActionTypes.CREATE_RECEIPT_SUCCESS: {
        return adapter.addOne(action.payload, state);
      }
  
      case receiptsActions.ActionTypes.CREATE_RECEIPT_ERROR: {
        return {
          ...state,
          error: action.payload
        };
      }

      case receiptsActions.ActionTypes.UPLOAD_IMAGE_SUCCESS: {
        return adapter.updateOne(action.payload, state);
      }
  
      case receiptsActions.ActionTypes.UPLOAD_IMAGE_ERROR: {
        return {
          ...state,
          error: action.payload
        };
      }

      case receiptsActions.ActionTypes.DELETE_RECEIPT: {
        return adapter.removeOne(action.payload, state);
      }

      case receiptsActions.ActionTypes.DELETE_RECEIPT_ERROR: {
        return {
          ...state,
          error: action.payload
        };
      }

       case receiptsActions.ActionTypes.LOAD_USER_RECEIPTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    case receiptsActions.ActionTypes.LOAD_USER_RECEIPTS_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

      default:
        return state;
    }
}