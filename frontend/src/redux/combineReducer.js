import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";

export const combineReducer = combineReducers({
    userReducer:userReducer,    // Assign userReducer to the 'userReducer' key in the state
    cartReducer:cartReducer     // Assign cartReducer to the 'cartReducer' key in the state
});