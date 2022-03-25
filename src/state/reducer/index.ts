import { combineReducers } from "redux";
import codeCellReducer from "./codeCellreducer";

const reducers = combineReducers({ cells: codeCellReducer });

export default reducers;

export type RootState = ReturnType<typeof reducers>;
