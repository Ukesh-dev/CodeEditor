import { Dispatch } from "redux";
import bundle from "../../bundle";
import { ActionType } from "../action-types";
import {
  Direction,
  DeleteCellAction,
  InsertBeforeCellAction,
  MoveCellAction,
  UpdateCellAction,
  Action,
} from "../actions";
import { CellTypes } from "../cell";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => ({
  type: ActionType.DELETE_CELL,
  payload: id,
});

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertBeforeCellAction => ({
  type: ActionType.INSERT_CELL_AFTER,
  payload: { id, type: cellType },
});

export const moveCell = (id: string, direction: Direction): MoveCellAction => ({
  type: ActionType.MOVE_CELL,
  payload: {
    id,
    direction,
  },
});

export const bundleAction =
  (id: string, input: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.BUNDLE_START, payload: { id } });
    const result = await bundle(input);

    dispatch({ type: ActionType.BUNDLE_COMPLETE, payload: { id, ...result } });
  };
