/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars*/

import rootReducer from './redux/index';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default(initialState) => {
    return createStore(rootReducer,
    /* preloadedState, */
    composeEnhancers(applyMiddleware(thunk))
)}
/* eslint-enable */
