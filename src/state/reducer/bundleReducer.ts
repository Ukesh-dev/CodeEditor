import produce from "immer";
import { DRAFT_STATE } from "immer/dist/internal";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface BundleState {
  [key: string]: {
    loading: boolean;
    err: string;
    code: string;
  };
}

export const bundleReducers = (
  state: BundleState = {},
  action: Action
): BundleState =>
  produce(state, (draft) => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        // * Updated by immer
        draft[action.payload.id] = { loading: true, err: "", code: "" };
        // * Update by pure redux
        // return {
        //   ...draft,
        //   [action.payload.id]: {
        //     ...draft[action.payload.id],
        //     loading: true,
        //     err: "",
        //     code: "",
        //   },
        // };
        break;
      case ActionType.BUNDLE_COMPLETE:
        draft[action.payload.id] = {
          loading: false,
          err: action.payload.err,
          code: action.payload.code,
        };
        break;
      default:
        return draft;
    }
  });
