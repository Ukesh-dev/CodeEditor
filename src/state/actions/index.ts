import { ActionType } from "../action-types";
import { Cell, CellTypes } from "../cell";

export type Direction = "up" | "down";

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface InsertBeforeCellAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}
export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    id: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    id: string;
    code: string;
    err: string;
  };
}
export interface FetchCellAction {
  type: ActionType.FETCH_CELLS;
  payload: Cell[];
}
export interface AddTutorialAction {
  type: ActionType.ADD_TUTORIAL;
  payload: ["code", "text"];
}

// export interface SaveCellAction {
//   type: ActionType.SAVE_CELLS;
//   payload: string;
// }

export type Action =
  | InsertBeforeCellAction
  | UpdateCellAction
  | DeleteCellAction
  | MoveCellAction
  | BundleCompleteAction
  | BundleStartAction
  | FetchCellAction
  | AddTutorialAction;
