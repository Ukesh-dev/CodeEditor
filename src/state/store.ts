import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { persistMiddleware } from "./middleware/persist-middleware";
import reducers from "./reducer";

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware, thunk)
);

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: { id: "", type: "code" },
// });
