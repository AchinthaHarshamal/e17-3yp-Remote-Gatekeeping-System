import authReducer from "./authReducer";
import dashboardReducer from "./dashboardReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";


const rootReducer = combineReducers({
    auth: authReducer,
    dboard : dashboardReducer,
    firestore : firestoreReducer,
    firebase : firebaseReducer
});


export default rootReducer;