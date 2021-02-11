import Axios from 'axios';
import { getToken } from '../../config/function';
import { BASE_URL } from '../../config/URL';

export const GET_TRANSAKSI = 'GET_TRANSAKSI';
export const CLEAR_TRANSAKSI = 'CLEAR_TRANSAKSI';

export const getTransaksi = (user_id) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'order?by_user_id=' + user_id, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        })
            .then(response => {
                dispatch({
                    type: GET_TRANSAKSI,
                    data: response.data.data,
                });
            }).catch(err => console.log(err));
    };
};

export const clearTransaksi = () => {
    return async (dispatch) => {
        dispatch({
            type: CLEAR_TRANSAKSI,
            data: [],
        });
    };
};
