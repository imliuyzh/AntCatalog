export const addCourse = (courses) => {
    return dispatch => {
        dispatch({
            courses,
            type: "ADD_COURSE"
        });
    };
};

export const removeCourse = (courses, targetCourse) => {
    return dispatch => {
        dispatch({
            courses,
            targetCourse,
            type: "REMOVE_COURSE"
        });
    };
};

export const resetCourses = () => {
    return dispatch => {
        dispatch({ type: "RESET_COURSES" });
    };
};
