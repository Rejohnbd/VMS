import {
    GET_DEVICES, 
    ADD_DEVICE
 } from '../Types';

const initialState = {
    devices: [],
    device: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_DEVICES:
            return {
                ...state,
                devices: action.payload
            }
        default: return state;
    }
}