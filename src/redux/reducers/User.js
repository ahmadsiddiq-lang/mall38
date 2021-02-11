import { GET_USER, CLEAR_USER, GET_WALLET, GET_HOSTORY_WALLET, GET_REKENING, CLEAR_WALLET, CLEAR_HISTORY_WALLET } from '../actions/User';

const initioalState = {
    dataUser: [],
    dataWallet: {},
    dataHistoryWallet: {},
    noRekening: [],
};

const getDataUserReducer = (state = initioalState, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                dataUser: action.data,
            };
        case CLEAR_USER:
            return {
                ...state,
                dataUser: action.data,
            };
        case GET_WALLET:
            return {
                ...state,
                dataWallet: action.data,
            };
        case CLEAR_WALLET:
            return {
                ...state,
                dataWallet: action.data,
            };
        case GET_HOSTORY_WALLET:
            return {
                ...state,
                dataHistoryWallet: action.data,
            };
        case CLEAR_HISTORY_WALLET:
            return {
                ...state,
                dataHistoryWallet: action.data,
            };
        case GET_REKENING:
            return {
                ...state,
                noRekening: action.data,
            };

        default:
            return state;
    }
};

export default getDataUserReducer;
