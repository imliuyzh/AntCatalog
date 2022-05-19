import { configureStore } from '@reduxjs/toolkit';
import internalStateReducer from './features/internalStateSlice';
import searchResultReducer from './features/searchResultSlice';
import selectedCoursesReducer from './features/selectedCoursesSlice';

export const store = configureStore({
    reducer: {
        internalState: internalStateReducer,
        searchResult: searchResultReducer,
        selectedCourses: selectedCoursesReducer,
    }
});
