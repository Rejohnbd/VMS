import {
    GET_USER,
    SET_UNAUTHENTICATED
} from '../Types';

const initialSate = {
    authenticated: false,
    userType: null,
    userInfo: {
        // name: '',
        // email: '',
        // contact: '',
        // image: '',
    }

}

export default function(state = initialSate, action){
    switch(action.type){
        case GET_USER:
            return {
                ...state,
                authenticated: true,
                userType: 'admin',
                userInfo: action.payload
            };
        case SET_UNAUTHENTICATED:
            return initialSate;
        default:
            return state;
    }
}