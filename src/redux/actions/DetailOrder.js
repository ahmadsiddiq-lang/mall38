import Axios from 'axios';
import { BASE_URL } from '../../config/URL';


export const DETAIL_ORDER = 'DETAIL_ORDER';

export const detailOrder = (idOrder) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'detail-order?by_order_id=' + idOrder)
            .then(respons => {
                // console.log(respons);
                dispatch({
                    type: DETAIL_ORDER,
                    data: respons.data.data,
                });
            }).catch(err => {
                console.log(err);
            });
    };
};
