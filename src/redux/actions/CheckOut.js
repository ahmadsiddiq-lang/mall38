import Axios from 'axios';
import { BASE_URL } from '../../config/URL';

export const CHECKOUT = 'CHECKOUT';

export const checkOut = (data, handleNavToPembayaran) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'payment', data, {
            withCredentials: true,
        }).then(respons => {
            if (respons) {
                handleNavToPembayaran(respons.data.data);
            }
            // console.log(respons);
        }).catch(err => console.log(err));
    };
};
