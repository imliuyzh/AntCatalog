let initialState = {
    isAggregateData: null,
    data: []
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "ADD_RESULTS":
            return {
                isAggregateData: action.isAggregateData,
                data: [...state.data, ...action.data]
            };
        case "REPLACE_RESULTS":
            return {
                isAggregateData: action.isAggregateData,
                data: [...action.data]
            };
        default:
            return state;
    }
};

export default reducer;
