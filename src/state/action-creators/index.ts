import { useDispatch } from "react-redux";
import { ActionType } from "../action-types";
import {
  Direction,
  DeleteCellAction,
  InsertBeforeCellAction,
  MoveCellAction,
  UpdateCellAction,
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
