import { GET_MEMBER } from '../actions/Member';

const initioalState = {
    dataMember: [],
};

const cartReducer = (state = initioalState, action) => {
    switch (action.type) {
        case GET_MEMBER:
            return {
                ...state,
                dataMember: action.data,
            };
        default:
            return state;
    }
};

export default cartReducer;
