import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';

const rootReducer = combineReducers(reducer);

const enhancer = compose(
    applyMiddleware(createSagaMiddleware),
);

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, enhancer);
}
