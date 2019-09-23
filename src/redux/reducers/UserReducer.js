import {
    GET_USERS,
    SEND_ADMIN_NOTIFICATION,
    USER_DEVICES,
    UNASSIGN_DEVICE
} from '../Types';


const initialState = {
    users: [],
    user: {},
    devices: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case SEND_ADMIN_NOTIFICATION:
            return {
                ...state
            }
        case USER_DEVICES: 
            return {
                ...state,
                devices: action.payload
            }
        case UNASSIGN_DEVICE:
            return {
                ...state,
                devices: state.devices.filter(device => device.imei !== action.payload.imei)
            }
        default:
            return state
    }
}