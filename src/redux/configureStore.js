import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';

import { Tasks } from './tasks';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { initialTask } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({

            tasks: Tasks,

            ...createForms({
                task: initialTask
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}