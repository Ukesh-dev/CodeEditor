import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducer";
import { ActionType } from "./action-types";
import { persistMiddleware } from "./middleware/persist-middleware";

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware, thunk)
);

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: { id: "", type: "code" },
// });
