import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducer";
import { ActionType } from "./action-types";

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
