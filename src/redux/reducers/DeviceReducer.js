import {
    GET_DEVICES,
    ADD_DEVICE,
    ASSIGN_DEVICE_TO_USER,
    UNASSIGN_DEVICE_FROM_USER
    // GET_ALL_ASSIGN_DEVICES,
    // GET_ALL_UNASSIGN_DEVICES,
    // USER_DEVICES,
    // UNASSIGN_DEVICE,
    // ASSIGN_DEVICE,
    // GET_UNASSIGN_DEVICE
 } from '../Types';

const initialState = {
    devices: [],
    // device: {},
    // allAssignDevice: [],
    // allUnassignDevices: [],
    // unassignDevices: [] 
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_DEVICES:
            return {
                ...state,
                devices: action.payload
            }
        case ADD_DEVICE:
            return {
                ...state,
                devices: [...state.devices, action.payload]
            }
        case ASSIGN_DEVICE_TO_USER:
            return {
                ...state,
                devices: state.devices.map(
                    device => device._id === action.payload._id 
                    ? (device = action.payload)
                    : device
                )
            }
        case UNASSIGN_DEVICE_FROM_USER:
            return {
                ...state,
                devices: state.devices.map(
                    device => device._id === action.payload._id 
                    ? (device = action.payload)
                    : device
                )
            }
        // case GET_ALL_ASSIGN_DEVICES:
        //     return {
        //         ...state,
        //         allAssignDevice: action.payload
        //     }
        // case GET_ALL_UNASSIGN_DEVICES:
        //     return {
        //         ...state,
        //         allUnassignDevices: action.payload
        //     }
        // case UNASSIGN_DEVICE:
        //     console.log(action.payload,'From Device Reducer')
        //     return {
        //         ...state,
        //         devices: state.devices.filter(device => device.imei !== action.payload.imei)
        //     }
        // case ASSIGN_DEVICE:
        //     return {
        //         ...state,
        //         devices: [...state.devices, action.payload]
        //     }
        // case GET_UNASSIGN_DEVICE:
        //     return {
        //         ...state,
        //         unassignDevices: action.payload
        //     }
        default: return state;
    }
}