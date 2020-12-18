import { LOGIN_USER, LOGIN_ADMIN } from '../actions/Login';

const initialState = {
    dataUser: [],
    dataAdmin: [],
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                dataUser: action.data,
            };

        case LOGIN_ADMIN:
            return {
                ...state,
                dataAdmin: action.data,
            };

        default:
            return state;
    }
};

export default login;
