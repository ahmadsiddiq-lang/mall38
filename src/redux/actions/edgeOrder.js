export const SET_EDGE = 'SET_EDGE';


export const setEdge = (dataEdge) => {
    return async (dispatch) => {
        dispatch({
            type: SET_EDGE,
            data: dataEdge,
        });
    };
};
