import axios from 'axios';
import {
    GET_USERS,
    // UNASSIGN_DEVICE,
    // ASSIGN_DEVICE,
    SEND_ADMIN_NOTIFICATION
} from '../Types';

const BASE_URL = 'http://118.67.215.190:8880/api/';


export const getUsers = () => (dispatch) => {
    axios.get(BASE_URL+'users')
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// Notification not working
export const sendAdminNotification = (message) => (dispatch) => {
    axios.post(BASE_URL+'notifications', message)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: SEND_ADMIN_NOTIFICATION
            })
        })
        .catch(err => console.log(err))
}