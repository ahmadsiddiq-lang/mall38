import Axios from 'axios';
import { getToken } from '../../config/function';
import { BASE_URL } from '../../config/URL';

export const REGISTER = 'REGISTER';

export const registerUser = (data, handleReponsSucces, handleRequesError) => {
    console.log(data);
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'user-register', data, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(respons => {
            if (respons) {
                handleReponsSucces(respons.data.data.user);
            }
        }).catch(err => {
            // console.log(err.response)
            handleRequesError(err.response);
        });
    };
};
