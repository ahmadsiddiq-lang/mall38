import Axios from 'axios';
import { BASE_URL } from '../../config/URL';
export const DETAIL_PRODUK = 'DETAIL_PRODUK';

export const getDetailProduk = (id) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'get-product?by_id=' + id)
            .then(dataDetailProduk => {
                dispatch({
                    type: DETAIL_PRODUK,
                    data: dataDetailProduk.data.data,
                });
            }).catch(err => console.log(err));
    };
};
