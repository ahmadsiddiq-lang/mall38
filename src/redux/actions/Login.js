import Axios from 'axios';
import { BASE_URL } from '../../config/URL';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_ADMIN = 'LOGIN_ADMIN';

export const LoginUser = (data, handleErrorLogin, handleLoginSuccess) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'user-login', data)
            .then(dataUser => {
                // console.log(dataUser);
                handleLoginSuccess(dataUser.data.data.user);
                dispatch({
                    type: LOGIN_USER,
                    data: dataUser.data.data.user,
                });
            }).catch(err => {
                handleErrorLogin();
                console.log(err);
            });
    };
};

export const LoginAdmin = (data) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'login', data)
            .then(dataAdmin => {
                // console.log(dataAdmin);
                dispatch({
                    type: LOGIN_ADMIN,
                    data: dataAdmin.data.data,
                });
            }).catch(err => console.log(err));
    };
};
