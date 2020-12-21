import { ADD_CART, GET_CART } from '../actions/Cart';
import { CLEAR_ALL } from '../actions/Clear';

const initioalState = {
    dataCart: [],
    responAddCart: [],
};

const cartReducer = (state = initioalState, action) => {
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                dataCart: action.data,
            };
        case ADD_CART:
            return {
                ...state,
                responAddCart: action.data,
            };
        case CLEAR_ALL:
            return {
                ...state,
                dataCart: action.data,
            };
        default:
            return state;
    }
};

export default cartReducer;
