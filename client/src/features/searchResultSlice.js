import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAggregateData: null,
    data: [],
};

export const searchResultSlice = createSlice({
    name: 'searchResult',
    initialState,
    reducers: {
        addResult: (state, action) => {
            state.isAggregateData = action.payload.isAggregateData;
            state.data = state.data.concat(action.payload.data);
        },
        resetResult: (state) => {
            state.isAggregateData = null;
            state.data = [];
        },
        replaceResult: (state, action) => {
            state.isAggregateData = action.payload.isAggregateData;
            state.data = action.payload.data;
        },
    },
});

export const { addResult, resetResult, replaceResult } = searchResultSlice.actions;

export default searchResultSlice.reducer;
