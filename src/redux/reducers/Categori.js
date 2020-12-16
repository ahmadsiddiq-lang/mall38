import { GET_CATEGORI } from '../actions/Categori';


const initialState = {
    categori: [],
};

const getCategori = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORI:
            return {
                ...state,
                categori: action.data,
            };
        default:
            return state;
    }
};

export default getCategori;
