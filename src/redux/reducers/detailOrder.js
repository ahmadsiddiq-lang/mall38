import { DETAIL_ORDER } from '../actions/DetailOrder';

const initiolState = {
    detailOrder: {},
};

const detailOrderReducer = (state = initiolState, action) => {
    switch (action.type) {
        case DETAIL_ORDER:
            return {
                ...state,
                detailOrder: action.data,
            };
        default:
            return state;
    }
};

export default detailOrderReducer;
