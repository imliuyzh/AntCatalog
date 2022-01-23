let initialState = {};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "ADD_COURSE":
            return { ...initialState, ...action.courses };
        case "REMOVE_COURSE":
            let newState = { ...action.courses };
            delete newState[action.targetCourse];
            return newState;
        case "RESET_COURSES":
            return {};
        default:
            return state;
    }
};

export default reducer;
