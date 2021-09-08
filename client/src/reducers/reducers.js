import { combineReducers } from 'redux';
import searchResultReducer from './searchResultReducer';

const reducers = combineReducers({
    searchResult: searchResultReducer
});

export default reducers;