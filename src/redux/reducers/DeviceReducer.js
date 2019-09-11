import { 
    ADD_DEVICE
 } from '../Types';

const initialState = {
    devices: [],
    device: {}
}

export default function(state = initialState, action){
    switch(action.type){
        default: return state;
    }
}