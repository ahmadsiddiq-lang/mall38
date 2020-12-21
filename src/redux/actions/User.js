import Axios from 'axios';
import { BASE_URL } from '../../config/URL';

export const GET_USER = 'GET_USER';
export const CLEAR_USER = 'GET_USER';

export const getDataUser = (id) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'get-user-profile?user_id=' + id, {
            withCredentials: true,
        }).then(dataUser => {
            // console.log(dataUser);
            dispatch({
                type: GET_USER,
                data: dataUser.data.data,
            });
        });
    };
};

export const clearDataUser = () => {
    return async (dispatch) => {
        dispatch({
            type: CLEAR_USER,
            data: {},
        });
    };
};
