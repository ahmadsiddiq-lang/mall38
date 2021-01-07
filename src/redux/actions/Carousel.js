import Axios from 'axios';
import { getToken } from '../../config/function';
import { BASE_URL } from '../../config/URL';
export const GET_CAROUSEL = 'GET_CAROUSEL';

export const getCarousel = (setVisible) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'banner', {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(dataCarousel => {
            setVisible(true);
            dispatch({
                type: GET_CAROUSEL,
                data: dataCarousel.data.data.banner,
            });
        }).catch(err => console.log(err));
        // const dataCarousel = await Axios.get(BASE_URL + 'banner');
        // dispatch({
        //     type: GET_CAROUSEL,
        //     data: dataCarousel.data.data.banner,
        // });
    };
};
