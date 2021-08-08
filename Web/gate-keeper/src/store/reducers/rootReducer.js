import authReducer from "./authReducer";
import dashboardReducer from "./dashboardReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";


const rootReducer = combineReducers({
    auth: authReducer,
    dboard : dashboardReducer,
    firestore : firestoreReducer
});


export default rootReducer;