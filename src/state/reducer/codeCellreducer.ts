import produce, { Draft } from "immer";
import { Reducer } from "react";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";
import { store } from "../store";

export type CellState = {
  loading: boolean;
  data: {
    [key: string]: Cell;
  };
  order: string[];
  error: string | null;
};

export const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

// const codeCellReducer = (
//   state: CellState = initialState,
//   action: Action
// ): CellState => {
//   switch (action.type) {
//     case ActionType.INSERT_CELL_BEFORE:
//       const cell: Cell = {
//         id: generateQuickGuid(),
//         content: "",
//         type: action.payload.type,
//       };

//       state.data[cell.id] = cell;
//       const foundIndex = state.order.findIndex(
//         (id) => id === action.payload.id
//       );

//       if (foundIndex < 0) {
//         state.order.push(cell.id);
//       } else {
//         state.order.splice(foundIndex, 0, cell.id);
//       }
//       return { ...state };

//     case ActionType.DELETE_CELL:
//       // ! State updated with Immer
//       // delete state.data[action.payload];
//       // state.order = state.order.filter((id) => id !== action.payload);

//       // ! State updated with plain Redux
//       delete state.data[action.payload];
//       return {
//         ...state,
//         order: state.order.filter((id) => id !== action.payload),
//       };

//     case ActionType.MOVE_CELL:
//       const { direction } = action.payload;
//       const index = state.order.findIndex((id) => id === action.payload.id);
//       const targetIndex = direction === "up" ? index - 1 : index + 1;

//       if (index === 0 || index === state.order.length - 1) {
//         return state;
//       }
//       state.order[index] = state.order[targetIndex];
//       state.order[targetIndex] = action.payload.id;

//       return state;

//     case ActionType.UPDATE_CELL:
//       const { id, content } = action.payload;
//       console.log("inside update action");
//       // console.log(store.getState());
//       console.log(content, id);
//       state.data[id].content = content;
//       // return state;

//       return {
//         ...state,
//         data: { [id]: { ...state.data[id], content } },
//         // data: {...state.data, },
//       };

//     default:
//       return state;
//   }
// };

function generateQuickGuid() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

const codeCellReducer = (
  state: CellState = initialState,
  action: Action
): CellState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionType.INSERT_CELL_AFTER:
        const cell: Cell = {
          id: generateQuickGuid(),
          content: "",
          type: action.payload.type,
        };
        const foundIndex = draft.order.findIndex(
          (id) => id === action.payload.id
        );
        draft.data[cell.id] = cell;

        if (foundIndex < 0) {
          draft.order.unshift(cell.id);
        } else {
          draft.order.splice(foundIndex + 1, 0, cell.id);
        }
        break;

      case ActionType.DELETE_CELL:
        // ! State updated with Immer
        delete draft.data[action.payload];
        draft.order = draft.order.filter((id) => id !== action.payload);

        // ! State updated with plain Redux
        // delete state.data[action.payload];
        // return {
        //   ...state,
        //   order: state.order.filter((id) => id !== action.payload),
        // };
        break;

      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        console.log(state.order);
        console.log(draft);
        console.log(index);
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        // console.log(targetIndex);

        if (targetIndex < 0 || targetIndex > draft.order.length - 1) {
          console.log("can't run man");
          return draft;
        }
        draft.order[index] = draft.order[targetIndex];
        draft.order[targetIndex] = action.payload.id;

        break;

      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        draft.data[id].content = content;
        break;
      //     return {
      //       ...state,
      //       [id]: {
      //         ...state.data[id],
      //         content,
      //       },
      //     };
      // default:
      //   return draft;
    }
  });
};

export default codeCellReducer;
