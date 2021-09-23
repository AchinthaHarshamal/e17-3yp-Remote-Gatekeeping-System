import addPreviousEventReducer from "./addPreviousEventReducer";
import mailBoxAccessReducer from "./mailBoxAccessReducer";
import loginStateReducer from "./loginStateReducer";
import { combineReducers } from "redux";

const mainReducer = combineReducers({
  addPreviousEvent: addPreviousEventReducer,
  mailBoxAcess: mailBoxAccessReducer,
  loginState: loginStateReducer,
});

export default mainReducer;
