import FireConf from '../../config/FirebaseConfig';
import axios from 'axios';
import {
    GET_USER,
    SET_UNAUTHENTICATED
} from '../Types';

import { 
    showSuccessMessage, 
    showErrorMessage
} from './MessageAction';

import { 
    getUserAuth
} from './AuthAction';

const BASE_URL = 'http://118.67.215.190:8880/api/';

// Firebase User Register
export const resigterUser = (email, password) => (dispatch) => {
    FireConf.auth().createUserWithEmailAndPassword(email, password)
            .then(response => {
                FireConf.auth().currentUser.sendEmailVerification()
                    .then(response => console.log('Send Email'))
                    .catch(err => {
                        console.error(err)
                    });
                if(response.user){
                    dispatch(showSuccessMessage());
                }
            })
            .catch(error => {
                dispatch(showErrorMessage(error.message));
            })
}


// Firebase User Login
export const userLogin = (email, password) => (dispatch) => {
    FireConf.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
        if(!response.user.emailVerified){
            dispatch(showErrorMessage('Please Check Your Mail. A verification link send your mail'));
        }else{
            let userData = response.user;
            dispatch(userAddToDb(userData));
        }
        
    })
    .catch(error => {
        if(error.code === 'auth/user-not-found'){
            dispatch(showErrorMessage('This Email Not Found'));
        }

        if(error.code === 'auth/wrong-password'){
            dispatch(showErrorMessage('The Email or password is invalid'));
        }
    })
}

// User Add to Database
export const userAddToDb = (userData) => (dispatch) => {
    axios.post(BASE_URL+'users/register', userData)
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res.data
            })
            // console.log(userData.ra,'Database Data');
            // dispatch(getUserAuth(userData.ra))
            //console.log(res.config.data.stsTokenManager.accessToken);
        })
        .catch(err => console.error(err));
}

export const logoutUser = () => (dispatch) => {
    dispatch({ type: SET_UNAUTHENTICATED })
}