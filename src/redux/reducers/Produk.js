import { CLEAR_TRACKING, GET_PRODUK, GET_TRACKING } from '../actions/Produk';

const inisialState = {
    produk: [],
    dataTracking: [],
};

const getProduk = (state = inisialState, action) => {
    switch (action.type) {
        case GET_PRODUK:
            return {
                ...state,
                produk: action.data,
            };
        case GET_TRACKING:
            return {
                ...state,
                dataTracking: action.data,
            };
        case CLEAR_TRACKING:
            return {
                ...state,
                dataTracking: action.data,
            };

        default:
            return state;
    }
};

export default getProduk;
