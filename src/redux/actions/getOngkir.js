import Axios from 'axios';
import { getToken } from '../../config/function';
import { BASE_URL } from '../../config/URL';

export const GET_ONGKIR = 'GET_ONGKIR';

export const getOngkir = (data) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'get-ongkir', data, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        })
            .then(dataOngkir => {
                dispatch({
                    type: GET_ONGKIR,
                    data: dataOngkir.data.data,
                });
            }).catch(err => console.log(err));
    };
};
