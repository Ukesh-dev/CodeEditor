import { combineReducers } from "redux";
import { bundleReducers } from "./bundleReducer";
import codeCellReducer from "./codeCellreducer";

const reducers = combineReducers({
  cells: codeCellReducer,
  bundles: bundleReducers,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
