import axios from 'axios';
import {
    GET_ALL_VEHICLES,
    LOADING_DATA
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