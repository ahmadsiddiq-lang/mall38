export const CLEAR_ALL = 'CLEAR_ALL';


export const clearAll = () => {
    return async (dispatch) => {
        dispatch({
            type: CLEAR_ALL,
            data: [],
        });
    };
};
