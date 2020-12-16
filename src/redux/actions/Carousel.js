import Axios from 'axios';
import { BASE_URL } from '../../config/URL';
export const GET_CAROUSEL = 'GET_CAROUSEL';

export const getCarousel = () => {
    return async (dispatch) => {
        const dataCarousel = await Axios.get(BASE_URL + 'banner');
        dispatch({
            type: GET_CAROUSEL,
            data: dataCarousel.data.data.banner,
        });
    };
};
