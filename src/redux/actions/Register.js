import Axios from 'axios';
import { BASE_URL } from '../../config/URL';

export const REGISTER = 'REGISTER';

export const registerUser = (data, handleReponsSucces) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'user-register', data, {
            withCredentials: true,
        }).then(respons => {
            if (respons) {
                handleReponsSucces();
            }
        }).catch(err => console.log(err));
    };
};
