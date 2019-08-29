import {
    GET_USER,
    SET_UNAUTHENTICATED
} from '../Types';

const initialSate = {
    authenticated: false,
    userInfo: {
        // name: '',
        // email: '',
        // contact: '',
        // image: '',
        userType: 'user'
    }
}

export default function(state = initialSate, action){
    switch(action.type){
        case GET_USER:
            return {
                ...state,
                authenticated: true,
                userInfo: action.payload
            };
        case SET_UNAUTHENTICATED:
            return initialSate;
        default:
            return state;
    }
}