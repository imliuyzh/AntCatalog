import { combineReducers } from 'redux';
import searchResultReducer from './searchResultReducer';
import selectedCoursesReducer from './selectedCoursesReducer';

const reducers = combineReducers({
    searchResult: searchResultReducer,
    selectedCourses: selectedCoursesReducer,
});

export default reducers;