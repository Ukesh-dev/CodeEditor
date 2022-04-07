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

const cellSaved = localforage.createInstance({
  name: "saveCell",
});
export const saveCells =
  () => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();
    const cells = order.map((id) => data[id]);
    cellSaved.setItem("cellSaved", cells);
  };
const tutorialCells = localforage.createInstance({
  name: "tutorialCell",
});

// export const saveTutorialCells = async () => {
//   tutorialCells.setItem('tutorialCell', )

// }

export const fetchCells =
  () => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    // const {
    //   cells: { order: tutorialCell },
    // } = getState();
    let cellItems: Cell[] = [];
    cellItems = (await cellSaved.getItem<Cell[]>("cellSaved")) ?? [];
    if (cellItems) {
      if (!localStorage.getItem("show")) {
        localStorage.setItem("show", "true");
        if (!localStorage.getItem("tutorial")) {
          localStorage.setItem("tutorial", JSON.stringify([]));
        }
      }

      if (localStorage.getItem("show") === "true") {
        localStorage.setItem("tutorial", JSON.stringify(["code", "text"]));
        if (localStorage.getItem("tutorial")) {
          const tutorial = JSON.parse(localStorage.getItem("tutorial") || "");

          console.log(tutorial);
          if (tutorial?.length !== 0) {
            // dispatch({
            //   type: ActionType.ADD_TUTORIAL,
            //   payload: ["code", "text"],
            // });
            console.log("inside localstoreage");
            localStorage.setItem("tutorial", JSON.stringify(["code", "text"]));
            if (cellItems.length === 0) {
              cellItems.push(
                {
                  id: "code",
                  content: 'console.log("hello")',
                  type: "code",
                },
                {
                  id: "text",
                  content: 'console.log("hello")',
                  type: "text",
                }
              );
              dispatch({
                type: ActionType.ADD_TUTORIAL,
                payload: ["code", "text"],
              });
            }
          }
        }
      }
    }

    dispatch({ type: ActionType.FETCH_CELLS, payload: cellItems ?? [] });
  };
