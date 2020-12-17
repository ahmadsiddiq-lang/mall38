import Axios from 'axios';
import { BASE_URL } from '../../config/URL';

export const GET_PRODUK_CATEGORI = 'GET_PRODUK_CATEGORI';

export const getProdukCategori = (id) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'get-product-category?by_category_id=' + id, {
            withCredentials: true,
        })
            .then(dataProdukCategori => {
                dispatch({
                    type: GET_PRODUK_CATEGORI,
                    data: dataProdukCategori.data.data,
                });
            }).catch(err => console.log(err));
    };
};
