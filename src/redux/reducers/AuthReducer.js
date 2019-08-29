import {
    GET_USER
} from '../Types';

const initailState = {};

export default function(state = initailState, action){
    switch(action.type){
        case GET_USER: 
            return {
                ...state,
                
            }
        default: return state;
    }
}