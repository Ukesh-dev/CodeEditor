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

// const cellSaved = localforage.createInstance({
//   name: "cellSaved",
// });

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
    console.log("inside bundleAction");

    dispatch({ type: ActionType.BUNDLE_COMPLETE, payload: { id, ...result } });
  };

const cellSaved = localforage.createInstance({
  name: "saveCell",
});

export const saveCells =
  () => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    // console.log("inside timer");
    const {
      cells: { data, order },
    } = getState();
    const cells = order.map((id) => data[id]);
    cellSaved.setItem("cellSaved", cells);
  };

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
            localStorage.setItem("tutorial", JSON.stringify(["code", "text"]));
            if (cellItems.length === 0) {
              cellItems.push(
                {
                  id: "text",
                  content: `
# UksBook
This a interactive coding environment. You can write Javascript, see it executed and write comprehensive documentation using markdown.


----------


- Click any text (**including this one**)  to edit it.
- The code in each code editor is joined together.
- You can show any React Component, string, number, or anything else by calling the \`show()\` function. This function is built into this environment. Call show multiple times to show multiple values.
- Add new cells by hovering on the divider between each cell.

All of your changes will get saved. So, **No Worries** 

----------

**Keep Coding**



                  `,
                  type: "text",
                },
                {
                  id: "code",
                  content: `
 import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div
      style={{
        fontSize: '2rem',
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        padding: '1rem',
      }}
    >
      <div>
        <h2>Counter</h2>
        <button onClick={() => setCount(count + 1)}>Click</button>
        <h2>{count}</h2>
      </div>
    </div>
  );
};
show(<Counter />);


                  `,
                  type: "code",
                },
                {
                  id: "newcode",
                  content: `

show(<Counter/>)`,
                  type: "code",
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
    // dispatch({ type: ActionType.SAVE_CELLS, payload: cells });
  };
