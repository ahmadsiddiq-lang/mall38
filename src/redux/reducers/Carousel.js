import { GET_CAROUSEL } from '../actions/Carousel';

const initialState = {
    Carousel: [],
};

const CarouselReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CAROUSEL:
            return {
                ...state,
                Carousel: action.data,
            };
        default:
            return state;
    }
};

export default CarouselReducer;
