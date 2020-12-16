import Axios from 'axios';
import { BASE_URL } from '../../config/URL';
export const GET_FLASH = 'GET_PRODUK';

export const getFlashSale = (page) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'product').then(dataProduk => {
            dispatch({
                type: GET_FLASH,
                data: dataProduk.data.data.product,
            });
        }).catch(err => console.log(err));
    };
};
