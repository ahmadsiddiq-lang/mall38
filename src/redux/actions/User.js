import Axios from 'axios';
import { getToken } from '../../config/function';
import { BASE_URL } from '../../config/URL';

export const GET_USER = 'GET_USER';
export const CLEAR_USER = 'GET_USER';
export const GET_WALLET = 'GET_WALLET';
export const GET_HOSTORY_WALLET = 'GET_HOSTORY_WALLET';
export const GET_REKENING = 'GET_REKENING';
export const CLEAR_WALLET = 'CLEAR_WALLET';
export const CLEAR_HISTORY_WALLET = 'CLEAR_HISTORY_WALLET';

export const getDataUser = (id, setLoadingData) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'get-user-profile?user_id=' + id, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(dataUser => {
            // console.log(dataUser);
            if (setLoadingData) {
                setLoadingData(true);
            }
            dispatch({
                type: GET_USER,
                data: dataUser.data.data,
            });
        });
    };
};

export const clearDataUser = () => {
    return async (dispatch) => {
        dispatch({
            type: CLEAR_USER,
            data: {},
        });
    };
};

export const clearDataWallet = () => {
    return async (dispatch) => {
        dispatch({
            type: CLEAR_WALLET,
            data: {},
        });
    };
};

export const clearHistoryWallet = () => {
    return async (dispatch) => {
        dispatch({
            type: CLEAR_HISTORY_WALLET,
            data: {},
        });
    };
};

export const updateProfile = (data, handleUser, inValid) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'post-update-profile', data, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        })
            .then(respon => {
                handleUser();
            }).catch(err => {
                inValid();
                console.log(err);
            });
    };
};

export const getWallet = (idUser) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'get-wallet?user_id=' + idUser, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(respons => {
            // console.log(respons);
            dispatch({
                type: GET_WALLET,
                data: respons.data.data,
            });
        }).catch(err => {
            // console.log(err.response);
            if (err.response.status === 500) {
                dispatch({
                    type: GET_WALLET,
                    data: {},
                });
            }
        });
    };
};

export const getHostoryWallet = (idUser) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'get-wallet-history?user_id=' + idUser, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(respons => {
            // console.log(respons);
            dispatch({
                type: GET_HOSTORY_WALLET,
                data: respons.data.data,
            });
        }).catch(err => {
            // console.log(err.response);
            if (err.response.status === 500) {
                dispatch({
                    type: GET_HOSTORY_WALLET,
                    data: [],
                });
            }
        });
    };
};

export const forgotePassword = (data, handleSuccess, handleInvalid) => {
    return async (dispatch) => {
        await Axios.post(BASE_URL + 'update-password', data, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        })
            .then(response => {
                console.log(response.data);
                handleSuccess();
            }).catch(err => {
                console.log(err.response);
                handleInvalid();
            });
    };
};

export const checkPassword = (data, setErr) => {
    return async () => {
        await Axios.post(BASE_URL + 'check-password-user', data, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(response => {
            console.log(response.data);
            setErr(1);
        }).catch(err => {
            console.log(err.response);
            setErr(0);
        });
    };
};


export const updatePssword = (data, handleSuccess) => {
    return async () => {
        await Axios.post(BASE_URL + 'update-password-user', data, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(response => {
            // console.log(response.data);
            handleSuccess();
        }).catch(err => {
            console.log(err.response);
        });
    };
};


export const getRekening = (idUser, setLoading) => {
    return async (dispatch) => {
        await Axios.get(BASE_URL + 'user-bank-info?user_id=' + idUser, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then(response => {
            // console.log(response.data);
            dispatch({
                type: GET_REKENING,
                data: response.data.data,
            });
            setLoading(true);
        }).catch(err => {
            console.log(err.response);
        });
    };
};

export const updateDataBank = (data, handleSuccess, handleInvalid) => {
    return async () => {
        await Axios.post(BASE_URL + 'user-bank-post', data, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer' + await getToken(),
            },
        }).then((response) => {
            console.log(response.data);
            handleSuccess();
        }).catch(err => {
            console.log(err.response);
            handleInvalid();
        });
    };
};
