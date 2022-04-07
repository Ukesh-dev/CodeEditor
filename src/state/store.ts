import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { persistMiddleware } from "./middleware/persist-middleware";
import reducers from "./reducer";
<<<<<<< HEAD
import { ActionType } from "./action-types";
import { persistMiddleware } from "./middleware/persist-middleware";
=======
>>>>>>> da39b7c02f243f76bb91448a944f52ffff2e2b0a

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware, thunk)
);

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: { id: "", type: "code" },
// });
