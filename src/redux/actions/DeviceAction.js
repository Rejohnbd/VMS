import axios from 'axios';
import {
    ADD_DEVICE
} from '../Types';
import {
    deviceAddedSuccessfully
} from '../actions/PopupMessageAction';

const BASE_URL = 'http://118.67.215.190:8880/api/';

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