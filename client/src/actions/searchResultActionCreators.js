const addResults = (results) => {
    return dispatch => {
        dispatch({
            type: "ADD_RESULTS",
            payload: results
        });
    };
};

const replaceResults = (results) => {
    return dispatch => {
        dispatch({
            type: "REPLACE_RESULTS",
            payload: results
        });
    };
};

export * as searchResultActionCreators;
