import {DATA_GET_REQUEST, DATA_GET_SUCCESS, DATA_GET_FAILURE} from "./types"
import axios from "axios";

export const listData = () => async(dispatch) => {
    try{
        dispatch({type: DATA_GET_REQUEST})
        const {data} = await axios.get("http://localhost:8080/")
        dispatch({type: DATA_GET_SUCCESS, payload: data})
    }catch(err){
        dispatch({type: DATA_GET_FAILURE, payload: err.message})
    }
}