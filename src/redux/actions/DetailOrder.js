import Axios from 'axios';
import { getToken } from '../../config/function';
import { BASE_URL } from '../../config/URL';


export const DETAIL_ORDER = 'DETAIL_ORDER';
export const CLEAR = 'CLEAR';

export const detailOrder = (idOrder) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'detail-order?by_order_id=' + idOrder, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        })
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

export const clearDetailOrder = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR,
            data: {},
        });
    };
};
