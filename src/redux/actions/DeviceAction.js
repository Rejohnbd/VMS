import axios from 'axios';
import {
    GET_DEVICES,
    GET_UNASSIGN_DEVICE
} from '../Types';
import {
    deviceAddedSuccessfully
} from '../actions/PopupMessageAction';

const BASE_URL = 'http://118.67.215.190:8880/api/';

export const getDevices = () => (dispatch) => {
    axios.get(BASE_URL+'devices')
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_DEVICES,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const getUnassignDevices = () => (dispatch) => {
    axios.get(BASE_URL+'devices/unassign')
        .then(res => {
            dispatch({
                type: GET_UNASSIGN_DEVICE,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const addDevice = (device) => (dispatch) => {
    axios.post(BASE_URL+'devices', device)
        .then(res => {
            dispatch(deviceAddedSuccessfully());
            console.log(res.data)
            // dispatch({
            //     type: ADD_DEVICE,
            //     payload: 
            // })
        })
        .catch(err => console.log(err))
}