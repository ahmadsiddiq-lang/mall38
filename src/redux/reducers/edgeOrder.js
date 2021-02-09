import { SET_EDGE } from '../actions/edgeOrder';

const initioalState = {
    edgeOrder: [],
};

const edgeOrderReducer = (state = initioalState, action) => {
    switch (action.type) {
        case SET_EDGE:
            return {
                ...state,
                edgeOrder: action.data,
            };
        default:
            return state;
    }
};

export default edgeOrderReducer;
