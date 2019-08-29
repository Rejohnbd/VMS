import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  DEFAULT_MESSAGE
} from '../Types';

const initialState = {
    message: false,
    textDetails: '',
    className: ''
}

export default function(state = initialState, action){
    switch(action.type){
        case SUCCESS_MESSAGE:
            return {
                ...state,
                message: true,
                textDetails: 'Please Check your mail. A verification mail send your mail',
                className: 'alert-success'
            };
        case ERROR_MESSAGE:
            return {
                ...state,
                message: true,
                textDetails: action.textDetails,
                className: 'alert-danger'
            };
        case DEFAULT_MESSAGE:
            return initialState;
        default: return state;
    }
}