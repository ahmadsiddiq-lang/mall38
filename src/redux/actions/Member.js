import Axios from 'axios';
import { getToken } from '../../config/function';
import { BASE_URL } from '../../config/URL';

export const GET_MEMBER = 'GET_MEMBER';

export const getMember = (kode) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'get-member?refferal_code=' + kode, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(response => {
            // console.log(response.data);
            dispatch({
                type: GET_MEMBER,
                data: response.data.data.member,
            });
        }).catch(err => {
            console.log(err.response);
        });
    };
};
