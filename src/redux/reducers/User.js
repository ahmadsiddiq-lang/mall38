import { GET_USER, CLEAR_USER } from '../actions/User';

const initioalState = {
    dataUser: [],
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

        default:
            return state;
    }
};

export default getDataUserReducer;
