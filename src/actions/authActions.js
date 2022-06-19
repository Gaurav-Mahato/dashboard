import axios from "axios";
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST } from "./types";

export const login = (name,password) => async(dispatch) => {
    try{
        const obj = {
            name,
            password
        }
        dispatch({type: LOGIN_REQUEST})
        const {data} = await axios.post("http://localhost:8080/",obj)
        dispatch({type: LOGIN_SUCCESS, payload: data})
    }
    catch(err){
        dispatch({type: LOGIN_FAILURE, payload: err.message})
    }
}