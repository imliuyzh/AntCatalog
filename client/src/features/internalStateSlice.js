import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    alertMessage: '',
    formInput: {
        year: [],
        quarter: [],
        department: [],
        courseNumber: [],
        courseCode: [],
        instructor: [],
        aggregate: false,
        offset: 0
    },
    showAlert: false,
    showCourseList: false,
};

export const internalStateSlice = createSlice({
    name: 'internalState',
    initialState,
    reducers: {
        closeAlert: (state) => {
            state.showAlert = false;
        },
        closeCourseList: (state) => {
            state.showCourseList = false;
        },
        showAlert: (state, action) => {
            state.alertMessage = action.payload;
            state.showAlert = true;
        },
        resetFormInput: (state) => {
            state.formInput = {
                year: [],
                quarter: [],
                department: [],
                courseNumber: [],
                courseCode: [],
                instructor: [],
                aggregate: false,
                offset: 0
            };
        },
        showCourseList: (state) => {
            state.showCourseList = true;
        },
        updateFormInput: (state, action) => {
            state.formInput = { ...state.formInput, ...action.payload };
        },
    },
});

export const { closeAlert, closeCourseList, showAlert, resetFormInput, showCourseList, updateFormInput } = internalStateSlice.actions;

export default internalStateSlice.reducer;
