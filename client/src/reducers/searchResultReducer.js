let initialState = [];

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "ADD_RESULTS":
            return [...initialState, ...action.payload];
        case "REPLACE_RESULTS":
            return [...action.payload];
        default:
            return state;
    }
};

export default reducer;
