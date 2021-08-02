import authReducer from "./authReducer";
import dashboardReducer from "./dashboardReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    auth: authReducer,
    dboard : dashboardReducer
});


export default rootReducer;