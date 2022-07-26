import axios from "axios";
import { REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./types";

export const register = (name,password,email,zone_access, branch_access, plant_access,role,table) => async(dispatch) => {
    try{
        let obj
        if(table === 'user'){
            obj = {
                name,
                password,
                email,
                zone_access,
                branch_access,
                plant_access,
                role 
            }
        }
        else if(table === 'admin'){
            obj = {
                name,
                password,
                email
            }
        }
        dispatch({type: REGISTER_REQUEST})
        const {data} = await axios.post(`http://localhost:8080/${table}/register`,obj)
        dispatch({type: REGISTER_SUCCESS, payload: data})
        const {data: dataLogin} = await axios.post(`http://localhost:8080/${table}/login`, {
            email,
            password
        })
        dispatch({type: LOGIN_SUCCESS,payload: dataLogin})
    }
    catch(err){
        dispatch({type: REGISTER_FAILURE, payload: err.message})
    }
}

export const login = (email, password, table) => async(dispatch) => {
    try{
        const obj = {
            email,
            password
        }
        dispatch({type: LOGIN_REQUEST})
        const {data} = await axios.post(`http://localhost:8080/${table}/login`,obj)
        dispatch({type: LOGIN_SUCCESS, payload: data})
        localStorage.setItem("userInfo",JSON.stringify(data))
    }
    catch(err){
        dispatch({type: LOGIN_FAILURE, payload: err})
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({type: LOGOUT})
}