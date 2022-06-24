import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./authReducer";

export default combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})