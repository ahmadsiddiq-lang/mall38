import { DETAIL_PRODUK, CLEAR_DETAIL_PRODUK } from '../actions/DetailProduk';

const initialState = {
    detailProduk: [],
};

const getDetailProduk = (state = initialState, action) => {
    switch (action.type) {
        case DETAIL_PRODUK:
            return {
                ...state,
                detailProduk: action.data,
            };
        case CLEAR_DETAIL_PRODUK:
            return {
                ...state,
                detailProduk: action.data,
            };

        default:
            return state;
    }
};

export default getDetailProduk;
