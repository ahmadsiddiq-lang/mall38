import Axios from 'axios';
import { getToken } from '../../config/function';
import { BASE_URL } from '../../config/URL';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_ADMIN = 'LOGIN_ADMIN';

export const LoginUser = (data, handleErrorLogin, handleLoginSuccess) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'user-login', data, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        })
            .then(dataUser => {
                // console.log(dataUser);
                handleLoginSuccess(dataUser.data.data);
                dispatch({
                    type: LOGIN_USER,
                    data: dataUser.data.data,
                });
            }).catch(err => {
                handleErrorLogin();
                console.log(err);
            });
    };
};

export const LoginAdmin = (data, storeData) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'login', data)
            .then(dataAdmin => {
                storeData(dataAdmin.data.data);
                // dispatch({
                //     type: LOGIN_ADMIN,
                //     data: dataAdmin.data.data,
                // });
            }).catch(err => console.log(err));
    };
};

