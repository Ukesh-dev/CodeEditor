import { Dispatch } from "redux";
import { saveCells } from "../action-creators";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { RootState } from "../reducer";

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;
  return (next: (action: Action) => void) => (action: Action) => {
    next(action);
    if (
      [
<<<<<<< HEAD
        ActionType.INSERT_CELL_AFTER,
        ActionType.MOVE_CELL,
        ActionType.DELETE_CELL,
        ActionType.UPDATE_CELL,
=======
        ActionType.MOVE_CELL,
        ActionType.UPDATE_CELL,
        ActionType.INSERT_CELL_AFTER,
        ActionType.DELETE_CELL,
>>>>>>> da39b7c02f243f76bb91448a944f52ffff2e2b0a
      ].includes(action.type)
    ) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        saveCells()(dispatch, getState);
      }, 250);
    }
  };
};
