import {
    VEHICLE_UPDATE_SUCSS
} from '../Types';

export const vehicleUpdateSuccessfully = () => (dispatch) => {
    dispatch({ type: VEHICLE_UPDATE_SUCSS })
}

