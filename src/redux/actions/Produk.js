import Axios from 'axios';
import { BASE_URL } from '../../config/URL';
export const GET_PRODUK = 'GET_PRODUK';

export const getProduk = () => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'product', {
            withCredentials: true,
        }).then(dataProduk => {
            dispatch({
                type: GET_PRODUK,
                data: dataProduk.data.data.product,
            });
        }).catch(err => console.log(err));
        // const dataProduk = await Axios.get(BASE_URL + 'product?page=' + page);
        // dispatch({
        //     type: GET_PRODUK,
        //     data: dataProduk.data.data.product,
        // });
    };
};
