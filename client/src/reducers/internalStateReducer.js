let initialState = {
    alertMessage: '',
    formInput: {
        term: '',
        department: '',
        courseNumber: '',
        courseCode: '',
        instructor: '',
        aggregate: false,
        offset: 0
    },
    showAlert: false,
    showCourseList: false
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "CLOSE_ALERT":
            return {
                ...state,
                showAlert: false
            };
        case "CLOSE_COURSE_LIST":
            return {
                ...state,
                showCourseList: false
            };
        case "SHOW_ALERT":
            return {
                ...state,
                alertMessage: action.errorMessage,
                showAlert: true,
            };
        case "SHOW_COURSE_LIST":
            return {
                ...state,
                showCourseList: true
            };
        case "UPDATE_FORM_INPUT":
            return {
                ...state,
                formInput: { ...state.formInput, ...action.updatedFields }
            };
        default:
            return state;
    }
};

export default reducer;
