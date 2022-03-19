export const closeAlert = () => {
    return dispatch => {
        dispatch({ type: "CLOSE_ALERT" });
    };
};

export const closeCourseList = () => {
    return dispatch => {
        dispatch({ type: "CLOSE_COURSE_LIST" });
    };
};

export const showAlert = (errorMessage) => {
    return dispatch => {
        dispatch({
            errorMessage,
            type: "SHOW_ALERT"
        });
    };
};

export const showCourseList = () => {
    return dispatch => {
        dispatch({ type: "SHOW_COURSE_LIST" });
    };
};

export const updateFormInput = (updatedFields) => {
    return dispatch => {
        dispatch({
            updatedFields,
            type: "UPDATE_FORM_INPUT"
        });
    };
};

export const resetFormInput = () => {
    return dispatch => {
        dispatch({ type: "RESET_FORM_INPUT" });
    };
};
