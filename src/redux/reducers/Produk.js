import { GET_PRODUK } from '../actions/Produk';

const inisialState = {
    produk: [],
};

const getProduk = (state = inisialState, action) => {
    switch (action.type) {
        case GET_PRODUK:
            return {
                ...state,
                produk: action.data,
            };

        default:
            return state;
    }
};

export default getProduk;
