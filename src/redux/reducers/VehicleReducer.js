import {
    GET_ALL_VEHICLES,
    LOADING_DATA,
    EDIT_VEHICLE,
    UPDATE_VEHICLE
} from '../Types';

const initialState = {
    vehicles: [],
    vehicle: {},
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_VEHICLES:
            // console.log(action.payload,'Vehicle Reducer')
            //Not Work at this moment
            return {
                ...state,
                vehicles: action.payload,
                loading: false
            }
        case EDIT_VEHICLE:
            return {
                ...state,
                vehicle: action.payload
            }
        case UPDATE_VEHICLE:
            return {
                ...state,
                vehicle: action.payload
            }
        default: 
            return state;
    }
}
// export default function(state = [], action){
//     switch(action.type){
//         case GET_ALL_VEHICLE:
//             const newVehicle = action.payload;
//             console.log(newVehicle,"jhgkkj")
//             return action.payload
//         default: 
//             return state;
//     }
// }