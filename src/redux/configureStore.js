import {createStore, combineReducers, applyMiddleware } from 'redux';
import { Tasks } from './tasks';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            tasks: Tasks
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}
