import Axios from 'axios';
import { BASE_URL } from '../../config/URL';

export const CHECKOUT = 'CHECKOUT';

export const checkOut = (data) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'payment', data, {
            withCredentials: true,
        }).then(respons => {
            console.log(respons);
        }).catch(err => console.log(err));
    };
};
