import Axios from 'axios';
import { getToken } from '../../config/function';
import { BASE_URL } from '../../config/URL';
export const GET_FLASH = 'GET_PRODUK';

export const getFlashSale = (setvisibleFlashSale) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'product', {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(dataProduk => {
            setvisibleFlashSale(true);
            dispatch({
                type: GET_FLASH,
                data: dataProduk.data.data.product,
            });
        }).catch(err => console.log(err));
    };
};
