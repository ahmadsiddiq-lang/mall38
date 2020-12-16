import Axios from 'axios';
import { BASE_URL } from '../../config/URL';
export const GET_PRODUK = 'GET_PRODUK';

export const getProduk = () => {
    return async (dispatch) => {
        const dataProduk = await Axios.get(BASE_URL + 'product');
        dispatch({
            type: GET_PRODUK,
            data: dataProduk.data.data.product,
        });
    };
};
