import {
    VEHICLE_UPDATE_SUCSS,
    DEVICE_ADDED_SUCSS
} from '../Types';

const initialState = {
    title: '',
    message: '',
    type: '',
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
        duration: 5000,
        onScreen: true
    },
    slidingExit: {
        duration: 800,
        timingFunction: 'ease-out',
        delay: 0
    }
}

export default function(state = initialState, action) {
    switch(action.type) {
        case VEHICLE_UPDATE_SUCSS:
            return {
                ...state,
                type: 'success',
                title: 'Vehicle Update',
                message: 'Your Vehicle Info Update Successfully.'
            }
        case DEVICE_ADDED_SUCSS:
            return {
                ...state,
                type: 'success',
                title: 'Device Added',
                message: 'A New Device Added Successfully.'
            }
        default: 
            return state;
    }
} 