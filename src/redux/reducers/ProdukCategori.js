import { GET_PRODUK_CATEGORI } from '../actions/ProdukCategori';

const initialState = {
    produkCategori: [],
};

const getProdukCategori = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUK_CATEGORI:
            return {
                ...state,
                produkCategori: action.data,
            };
        default:
            return state;
    }
};

export default getProdukCategori;
