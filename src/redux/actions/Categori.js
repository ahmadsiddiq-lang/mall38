import Axios from 'axios';
import { BASE_URL } from '../../config/URL';
export const GET_CATEGORI = 'GET_CATEGORI';

export const getCategori = () => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'category', {
            withCredentials: true,
        }).then(dataCategori => {
            dispatch({
                type: GET_CATEGORI,
                data: dataCategori.data.data.category,
            });
        }).catch(err => console.log(err));
        // const dataCategori = await Axios.get(BASE_URL + 'category');
        // dispatch({
        //     type: GET_CATEGORI,
        //     data: dataCategori.data.data.category,
        // });
    };
};
