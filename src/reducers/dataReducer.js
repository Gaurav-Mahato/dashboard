import { DATA_GET_REQUEST, DATA_GET_SUCCESS, DATA_GET_FAILURE } from "../actions/types";

const initState = {
    loading: '',
    error: '',
    dataList: []
}
export default (state=initState, action) => {
    switch(action.type){
        case DATA_GET_REQUEST:
            return {loading: true, ...state}
        case DATA_GET_SUCCESS:
            return {loading: false, ...state, dataList: action.payload}
        case DATA_GET_FAILURE:
            return {...state,loading: false, error: action.payload}
        default:
            return state
    }
}