import Axios from 'axios';
import { getToken, ToasInvalid } from '../../config/function';
import { BASE_URL } from '../../config/URL';

export const CHECKOUT = 'CHECKOUT';

export const checkOut = (data, handleNavToPembayaran) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'payment', data, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(respons => {
            if (respons) {
                handleNavToPembayaran(respons.data.data);
            }
        }).catch(err => {
            ToasInvalid('Pesanan Gagal');
            console.log(err);
        });
    };
};
