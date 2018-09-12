import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';

import { Tasks, Task } from './tasks';
import { Image } from './image';
import { Admin } from './admin';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { initialTask } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({

            tasks: Tasks,
            task: Task,
            image: Image,
            amin: Admin,

            ...createForms({
                task: initialTask
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}