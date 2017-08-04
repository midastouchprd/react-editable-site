
import fetch from './reducers/fetch.js';
import {combineReducers} from 'redux';

//MUST ADD ANY NEW REDUCERS HERE OR THEIR STATE WON'T SHOW

const rootReducer = combineReducers({
  fetch,
});

export default rootReducer;
