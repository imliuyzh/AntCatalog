import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const selectedCoursesSlice = createSlice({
    name: 'selectedCourses',
    initialState,
    reducers: {
        addCourse: (state, action) => {
            state[action.payload.targetCourse] = action.payload.course;
        },
        removeCourse: (state, action) => {
            delete state[action.payload];
        },
        resetCourses: (state) => {
            for (let key in state) {
                delete state[key];
            }
        },
    },
});

export const { addCourse, removeCourse, resetCourses } = selectedCoursesSlice.actions;

export default selectedCoursesSlice.reducer;
