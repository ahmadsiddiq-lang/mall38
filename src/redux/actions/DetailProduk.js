import Axios from 'axios';
import { getToken } from '../../config/function';
import { BASE_URL } from '../../config/URL';
export const DETAIL_PRODUK = 'DETAIL_PRODUK';
export const CLEAR_DETAIL_PRODUK = 'CLEAR_DETAIL_PRODUK';

export const getDetailProduk = (id) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'get-product?by_id=' + id, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        })
            .then(dataDetailProduk => {
                dispatch({
                    type: DETAIL_PRODUK,
                    data: dataDetailProduk.data.data,
                });
            }).catch(err => console.log(err));
    };
};
export const clearDetailProduk = () => {
    return async (dispatch) => {
        dispatch({
            type: CLEAR_DETAIL_PRODUK,
            data: {},
        });
    };
};
