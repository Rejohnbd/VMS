import jwtDecode from 'jwt-decode';
import {

} from '../Types';


export const getUserAuth = (token) => (dispatch) => {
    localStorage.setItem('VmsToken', token);
    const localToken = localStorage.getItem('VmsToken');
    console.log(localToken,'localToken')
    if(localToken){
        const decodedToken = jwtDecode(localToken);
        console.log(decodedToken.exp * 1000, 'decodedToken')
        if(decodedToken.exp * 1000 < Date.now()){
            // dispatch(authUserLogin());
        } else {
            // dispatch(authUserLogout());
        }
    }

    
}