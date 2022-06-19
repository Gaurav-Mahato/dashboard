import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/types";

const initState = {
    loading: '',
    error: '',
    user: {}
}
export default (state=initState, action) => {
    switch(action.type){
        case LOGIN_REQUEST:
            return {loading: true, ...state}
        case LOGIN_SUCCESS:
            return {loading: false, ...state, user: action.payload}
        case LOGIN_FAILURE:
            return {...state,loading: false, error: action.payload}
        default:
            return state
    }
}