import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';

import { Tasks, Task } from './tasks';
import { Image } from './image';
import { Admin } from './admin';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { initialTask, initialEditTask } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({

            tasks: Tasks,
            task: Task,
            image: Image,
            admin: Admin,

            ...createForms({
                task: initialTask,
                editTask: initialEditTask
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}