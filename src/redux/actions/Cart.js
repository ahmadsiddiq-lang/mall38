import Axios from 'axios';
import { ToasSuccess } from '../../config/function';
import { BASE_URL } from '../../config/URL';

export const GET_CART = 'GET_CART';
export const ADD_CART = 'ADD_CART';
export const DELETE_PRODUK_CART = 'DELETE_PRODUK_CART';

export const getCArt = (idUser) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'list-cart?user_id=' + idUser)
            .then(dataCart => {
                // console.log(dataCart);
                dispatch({
                    type: GET_CART,
                    data: dataCart.data.data.cart,
                });
            }).catch(err => console.log(err));
    };
};

export const addCart = (data) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'add-to-cart', data)
            .then(responAddCart => {
                dispatch({
                    type: ADD_CART,
                    data: responAddCart,
                });
            }).catch(err => console.log(err));
    };
};

export const deleteProdukCart = (data, hetDataCart) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'delete-product-cart', data)
            .then(responAddCart => {
                ToasSuccess('Produk berhasil dihapus');
                // console.log(responAddCart);
                hetDataCart();
                dispatch({
                    type: DELETE_PRODUK_CART,
                });
            }).catch(err => console.log(err));
    };
};


