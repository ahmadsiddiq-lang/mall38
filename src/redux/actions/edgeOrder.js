export const SET_EDGE = 'SET_EDGE';
export const CLEAR_EDGE = 'CLEAR_EDGE';


export const setEdge = (dataEdge) => {
    return async (dispatch) => {
        dispatch({
            type: SET_EDGE,
            data: dataEdge,
        });
    };
};
export const clearEdge = () => {
    return async (dispatch) => {
        dispatch({
            type: CLEAR_EDGE,
            data: [],
        });
    };
};
