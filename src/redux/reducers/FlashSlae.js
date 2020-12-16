import { GET_PRODUK } from '../actions/Produk';

const inisialState = {
    flashsale: [],
};

const getProduk = (state = inisialState, action) => {
    switch (action.type) {
        case GET_PRODUK:
            return {
                ...state,
                flashsale: action.data,
            };

        default:
            return state;
    }
};

export default getProduk;
