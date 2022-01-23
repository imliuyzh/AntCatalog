import { combineReducers } from 'redux';
import InternalStateReducer from './internalStateReducer';
import searchResultReducer from './searchResultReducer';
import selectedCoursesReducer from './selectedCoursesReducer';

const reducers = combineReducers({
    InternalState: InternalStateReducer,
    searchResult: searchResultReducer,
    selectedCourses: selectedCoursesReducer,
});

export default reducers;