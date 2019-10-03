import axios from 'axios';
import {
    GET_DEVICES,
    ADD_DEVICE,
    ASSIGN_DEVICE_TO_USER,
    UNASSIGN_DEVICE_FROM_USER
    // ASSIGN_DEVICE,
    
    // GET_ALL_ASSIGN_DEVICES,
    // GET_ALL_UNASSIGN_DEVICES,
    // GET_UNASSIGN_DEVICE
} from '../Types';
import {
    deviceAddedSuccessfully
} from '../actions/PopupMessageAction';

const BASE_URL = 'http://118.67.215.190:8880/api/';

export const getDevices = () => (dispatch) => {
    axios.get(BASE_URL+'devices')
        .then(res => {
            dispatch({
                type: GET_DEVICES,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const addDevice = (device) => (dispatch) => {
    axios.post(BASE_URL+'devices', device)
        .then(res => {
            dispatch({
                type: ADD_DEVICE,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const assignedDeviceToUser = (data) => (dispatch) => {
    axios.post(BASE_URL+'devices/assign', data)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: ASSIGN_DEVICE_TO_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const unAssignUserDevice = (device) => (dispatch) => {
    axios.post(BASE_URL+'devices/unassign', device)
        .then(res => {
            console.log(res.data, 'From Device Action')
            dispatch({
                type: UNASSIGN_DEVICE_FROM_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// export const getUserDevice = (id) => (dispatch) => {
//     axios.get(BASE_URL+'users/'+id+'/devices')
//         .then(res => {
//             dispatch({
//                 type: USER_DEVICES,
//                 payload: res.data
//             })
//         })
//         .catch(err => console.log(err))
// }






// export const getAllAssignDevices = () => (dispatch) => {
//     axios.get(BASE_URL+'devices/assign')
//         .then(res => {
//             dispatch({
//                 type: GET_ALL_ASSIGN_DEVICES,
//                 payload: res.data
//             })
//         })
//         .catch(err => console.log(err))
// }

// export const getAllUnassignDevices = () => (dispatch) => {
//     axios.get(BASE_URL+'devices/unassign')
//         .then(res => {
//             dispatch({
//                 type: GET_ALL_UNASSIGN_DEVICES,
//                 payload: res.data
//             })
//         })
//         .catch(err => console.log(err))
// }

// export const getUnassignDevices = () => (dispatch) => {
//     axios.get(BASE_URL+'devices/unassign')
//         .then(res => {
//             dispatch({
//                 type: GET_UNASSIGN_DEVICE,
//                 payload: res.data
//             })
//         })
//         .catch(err => console.log(err))
// }

