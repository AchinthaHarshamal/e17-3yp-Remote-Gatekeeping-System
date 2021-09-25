import addPreviousEventReducer from "./addPreviousEventReducer";
import mailBoxAccessReducer from "./mailBoxAccessReducer";
import loginStateReducer from "./loginStateReducer";
import authReducer from "./authReducer";

import { combineReducers } from "redux";

const mainReducer = combineReducers({
  addPreviousEvent: addPreviousEventReducer,
  mailBoxAcess: mailBoxAccessReducer,
  loginState: loginStateReducer,
  authState: authReducer,
});

export default mainReducer;
