import { GET_ONGKIR } from '../actions/getOngkir';

const initialState = {
    dataOngkir: [],
};

const reducerOngkir = (state = initialState, action) => {
    switch (action.type) {
        case GET_ONGKIR:
            return {
                ...state,
                dataOngkir: action.data,
            };
        default:
            return state;
    }
};

export default reducerOngkir;
