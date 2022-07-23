import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "../actions/types";

const initState = {
    loading: '',
    error: '',
    user: {}
}
export const userRegisterReducer = (state=initState, action) => {
    switch(action.type){
        case REGISTER_REQUEST:
            return {loading: true, ...state}
        case REGISTER_SUCCESS:
            return {loading: false, ...state, user: action.payload.message}
        case REGISTER_FAILURE:
            return {...state,loading: false, error: action.payload}
        default:
            return state
    }
}

export const userLoginReducer = (state=initState, action) => {
    switch(action.type){
        case LOGIN_REQUEST:
            return {loading: true,...state}
        case LOGIN_SUCCESS:
            return {loading: false, user: action.payload}
        case LOGIN_FAILURE:
            return {error: action.payload,loading: false}
        case LOGOUT:
            return {}
        default:
            return state    
    }
}