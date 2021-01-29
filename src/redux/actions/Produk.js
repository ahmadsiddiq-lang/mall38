import Axios from 'axios';
import { getToken } from '../../config/function';
import { BASE_URL } from '../../config/URL';
export const GET_PRODUK = 'GET_PRODUK';
export const GET_TRACKING = 'GET_TRACKING';
export const CLEAR_TRACKING = 'CLEAR_TRACKING';

export const getProduk = (setVisible) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'product', {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(dataProduk => {
            if (setVisible) {
                setVisible(true);
            }
            dispatch({
                type: GET_PRODUK,
                data: dataProduk.data.data.product,
            });
        }).catch(err => console.log(err));
        // const dataProduk = await Axios.get(BASE_URL + 'product?page=' + page);
        // dispatch({
        //     type: GET_PRODUK,
        //     data: dataProduk.data.data.product,
        // });
    };
};

export const getTracking = (data, handledataTracking) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'tracking', data, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(response => {
            // console.log(response);
            dispatch({
                type: GET_TRACKING,
                data: response.data.data.rajaongkir,
            });
            // handledataTracking();
        }).catch(err => {
            console.log(err);
        });
    };
};

export const ClearTracking = (data, handledataTracking) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'tracking', data, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(response => {
            // console.log(response);
            dispatch({
                type: CLEAR_TRACKING,
                data: {},
            });
            // handledataTracking();
        }).catch(err => {
            console.log(err);
        });
    };
};
