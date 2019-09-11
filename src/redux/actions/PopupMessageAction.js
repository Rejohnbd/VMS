import {
    VEHICLE_UPDATE_SUCSS,
    DEVICE_ADDED_SUCSS
} from '../Types';

export const vehicleUpdateSuccessfully = () => (dispatch) => {
    dispatch({ type: VEHICLE_UPDATE_SUCSS })
}

export const deviceAddedSuccessfully = () => (dispatch) => {    
    dispatch({ type: DEVICE_ADDED_SUCSS })
}
