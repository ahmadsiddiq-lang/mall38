import { LOGIN_USER, LOGIN_ADMIN } from '../actions/Login';

const initialState = {
    dataUser: [],
    dataAdmin: [],
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            // console.log(action.data);
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

export default loginReducer;
