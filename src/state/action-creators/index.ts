import localforage from "localforage";
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
import { Cell, CellTypes } from "../cell";
import { RootState } from "../reducer";
import { CellState } from "../reducer/codeCellreducer";

const cellSaved = localforage.createInstance({
  name: "cellSaved",
});

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

export const fetchCells = () => async (dispatch: Dispatch<Action>) => {
  const data = await cellSaved.getItem<Cell[]>("cells");
  console.log(data);
  // return data?.["data"];
  dispatch({ type: ActionType.FETCH_CELLS, payload: data ?? [] });
};

export const saveCells =
  () => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    console.log("inside timer");
    const {
      cells: { data, order },
    } = getState();
    const cells = order.map((id) => data[id]);
    cellSaved.setItem("cells", cells);
    // dispatch({ type: ActionType.SAVE_CELLS, payload: cells });
  };
