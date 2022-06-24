import axios from "axios";
import { REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./types";

export const register = (name,password,email) => async(dispatch) => {
    try{
        const obj = {
            name,
            password,
            email
        }
        dispatch({type: REGISTER_REQUEST})
        const {data} = await axios.post("http://localhost:8080/admin/register",obj)
        dispatch({type: REGISTER_SUCCESS, payload: data})
    }
    catch(err){
        dispatch({type: REGISTER_FAILURE, payload: err.message})
    }
}

export const login = (email, password) => async(dispatch) => {
    try{
        const obj = {
            email,
            password
        }
        dispatch({type: LOGIN_REQUEST})
        const {data} = await axios.post("http://localhost:8080/admin/login",obj)
        dispatch({type: LOGIN_SUCCESS, payload: data})
        localStorage.setItem("userInfo",JSON.stringify(data))
    }
    catch(err){
        console.log(err)
        dispatch({type: LOGIN_FAILURE, payload: err})
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({type: LOGOUT})
}