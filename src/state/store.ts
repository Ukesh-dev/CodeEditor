import { useDispatch } from "react-redux";
import { applyMiddleware, createStore, Dispatch } from "redux";
import thunk from "redux-thunk";
import { actionCreator } from ".";
import { ActionType } from "./action-types";
import { Action } from "./actions";
import reducers from "./reducer";
import { initialState } from "./reducer/codeCellreducer";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: { id: "", type: "code" },
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: { id: "", type: "text" },
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: { id: "", type: "text" },
});
store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: { id: "", type: "code" },
});

console.log(store.getState());
