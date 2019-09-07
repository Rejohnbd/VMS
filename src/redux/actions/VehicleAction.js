import axios from 'axios';
import { 
    vehicleUpdateSuccessfully,
    
} from './PopupMessageAction';

import {
    EDIT_VEHICLE,
    UPDATE_VEHICLE
} from '../Types';

const BASE_URL = 'http://118.67.215.190:8880/api/';


export const getVehicleList = (email) => (dispatch) => {
    axios.get(BASE_URL+'users/'+email)
        .then(response => {
            console.log(response.data._id)
            return response.data._id
            // dispatch({
            //     type: GET_ALL_VEHICLES,
            //     payload: deviceList
            // })
        })
        .catch(error => console.log(error))
}

export const editVehicleInfo = (device) => (dispatch) => {
    dispatch({ 
        type: EDIT_VEHICLE,
        payload: device
    })
}

export const updateVehicleInfo = (id, data) => (dispatch) => {
    axios.put(BASE_URL+'devices/'+id, data)
        .then(res => {
            console.log(res)
            if(res.status === 201){
                dispatch(vehicleUpdateSuccessfully());
                dispatch({ 
                    type: UPDATE_VEHICLE,
                    payload: res.data
                })
            }
        })
        .catch(err => console.log(err))
}