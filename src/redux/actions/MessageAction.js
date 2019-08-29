import {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
    DEFAULT_MESSAGE
} from '../Types';


export const showSuccessMessage = () => (dispatch) => {
    dispatch({ 
        type: SUCCESS_MESSAGE
    })
}

export const showErrorMessage = (message) => (dispatch) => {
    // console.log(message);
    dispatch({ 
        type: ERROR_MESSAGE,
        textDetails: message
    })
}

export const setDefaultMessage = () => (dispatch) => {
    dispatch({ type: DEFAULT_MESSAGE });
}
