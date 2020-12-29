import { GET_TRANSAKSI } from '../actions/Transaksi';

const initiolState = {
    dataTransaksi: [],
};

const getTransaksiReducer = (state = initiolState, action) => {
    switch (action.type) {
        case GET_TRANSAKSI:
            return {
                ...state,
                dataTransaksi: action.data,
            };

        default:
            return state;
    }
};

export default getTransaksiReducer;
