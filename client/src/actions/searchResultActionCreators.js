export const addResults = (isAggregateData, results) => {
    return dispatch => {
        dispatch({
            type: "ADD_RESULTS",
            isAggregateData,
            data: results
        });
    };
};

export const replaceResults = (isAggregateData, results) => {
    return dispatch => {
        dispatch({
            type: "REPLACE_RESULTS",
            isAggregateData,
            data: results
        });
    };
};
