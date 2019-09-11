import {
    GET_USERS,
    SEND_ADMIN_NOTIFICATION
} from '../Types';


const initialState = {
    users: [],
    user: {}
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case SEND_ADMIN_NOTIFICATION:
            return {
                ...state
            }
        default:
            return state
    }
}