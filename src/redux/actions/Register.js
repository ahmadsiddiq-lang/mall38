import Axios from 'axios';
import { getToken } from '../../config/function';
import { BASE_URL } from '../../config/URL';

export const REGISTER = 'REGISTER';

export const registerUser = (data, handleReponsSucces, handleRequesError) => {
    // console.log(data);
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'user-register', data, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(respons => {
            if (respons) {
                handleReponsSucces(respons.data.data.user);
            }
        }).catch(err => {
            // console.log(err.response)
            handleRequesError(err.response);
        });
    };
};

export const setOtp = (kode, handleReponsSucces, handleError) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'activation-email', kode, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(response => {
            console.log(response);
            handleReponsSucces(response.data.data);
        }).catch(err => {
            console.log(err.response);
            handleError(err.response);
        });
    };
};

export const resendOTP = (email, resendSuccess, resendError) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'resend-otp?email=' + email, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(response => {
            console.log(response);
            resendSuccess(response.data.data);
        }).catch(err => {
            console.log(err.response);
            resendError(err.response.data);
        });
    };
};

export const getOtpForgote = (email, resendSuccess, resendError) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'forgot-password?email=' + email, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(response => {
            console.log(response);
            resendSuccess(response.data.data);
        }).catch(err => {
            console.log(err.response);
            resendError(err.response.data);
        });
    };
};
