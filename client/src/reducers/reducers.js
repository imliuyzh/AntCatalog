import { combineReducers } from 'redux';
import internalStateReducer from './internalStateReducer';
import searchResultReducer from './searchResultReducer';
import selectedCoursesReducer from './selectedCoursesReducer';

const reducers = combineReducers({
    internalState: internalStateReducer,
    searchResult: searchResultReducer,
    selectedCourses: selectedCoursesReducer,
});

export default reducers;