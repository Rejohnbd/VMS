import axios from 'axios';
import {
    GET_USERS,
    USER_DEVICES,
    UNASSIGN_DEVICE,
    SEND_ADMIN_NOTIFICATION
} from '../Types';

const BASE_URL = 'http://118.67.215.190:8880/api/';


export const getUsers = () => (dispatch) => {
    axios.get(BASE_URL+'users')
        .then(res => {
            // console.log(res.data)
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const getUserDevice = (id) => (dispatch) => {
    axios.get(BASE_URL+'users/'+id+'/devices')
        .then(res => {
            dispatch({
                type: USER_DEVICES,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const unAssignUserDevice = (device) => (dispatch) => {
    axios.post(BASE_URL+'devices/unassign', device)
        .then(res => {
            dispatch({
                type: UNASSIGN_DEVICE,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

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