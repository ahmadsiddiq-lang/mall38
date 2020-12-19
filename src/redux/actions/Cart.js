import Axios from 'axios';
import { ToastAndroid } from 'react-native';
import { BASE_URL } from '../../config/URL';

export const GET_CART = 'GET_CART';
export const ADD_CART = 'ADD_CART';

export const getCArt = (idUser) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + idUser)
            .then(dataCart => {
                dispatch({
                    type: GET_CART,
                    data: dataCart,
                });
            }).catch(err => console.log(err));
    };
};

export const addCart = (data) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'add-to-cart', data)
            .then(responAddCart => {
                ToastAndroid.showWithGravity('Dimasukkan ke keranjang', ToastAndroid.LONG, ToastAndroid.CENTER);
                dispatch({
                    type: ADD_CART,
                    data: responAddCart,
                });
            }).catch(err => console.log(err));
    };
};
