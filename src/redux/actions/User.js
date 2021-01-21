import Axios from 'axios';
import { getToken, ToasInvalid, ToasSuccess } from '../../config/function';
import { BASE_URL } from '../../config/URL';

export const GET_USER = 'GET_USER';
export const CLEAR_USER = 'GET_USER';

export const getDataUser = (id, setLoadingData) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'get-user-profile?user_id=' + id, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(dataUser => {
            // console.log(dataUser);
            if (setLoadingData) {
                setLoadingData(true);
            }
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

export const updateProfile = (data, handleUser) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'post-update-profile', data, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        })
            .then(respon => {
                handleUser();
                ToasSuccess('Update Berhasil');
            }).catch(err => {
                ToasInvalid('Update Gagal');
                console.log(err);
            });
    };
};

export const getWallet = (idUser) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'get-wallet?user_id=' + idUser, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(respon => {
            console.log(respon);
            // dispatch({
            //     type: CLEAR_USER,
            //     data: {},
            // });
        }).catch(err => {
            console.log(err);
        });
    };
};
