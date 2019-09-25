import {
    GET_DEVICES,
    GET_UNASSIGN_DEVICE
 } from '../Types';

const initialState = {
    devices: [],
    device: {},
    unassignDevices: [] 
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_DEVICES:
            return {
                ...state,
                devices: action.payload
            }
        case GET_UNASSIGN_DEVICE:
            return {
                ...state,
                unassignDevices: action.payload
            }
        default: return state;
    }
}