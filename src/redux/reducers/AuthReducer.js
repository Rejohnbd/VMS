import {
    GET_USER,
    SET_UNAUTHENTICATED
} from '../Types';

const initailState = {};

export default function(state = initailState, action){
    switch(action.type){
        case GET_USER: 
            return {
                ...state,
            }
        case SET_UNAUTHENTICATED: 
            return {
                initailState
            }
        default: return state;
    }
}