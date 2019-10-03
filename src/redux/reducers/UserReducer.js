import {
    GET_USERS,
    // SEND_ADMIN_NOTIFICATION
} from '../Types';


const initialState = {
    users: [],
    // user: {},
    // devices: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        // case SEND_ADMIN_NOTIFICATION:
        //     return {
        //         ...state
        //     }
        // case USER_DEVICES: 
        //     return {
        //         ...state,
        //         devices: action.payload
        //     }
        default:
            return state
    }
}