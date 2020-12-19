import { ADD_CART, GET_CART } from '../actions/Cart';

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
        default:
            return state;
    }
};

export default cartReducer;
