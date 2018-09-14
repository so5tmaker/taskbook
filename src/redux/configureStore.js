import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';

import { Tasks } from './tasks';
import { Task } from './taskEdit';
import { Image } from './image';
import { Admin } from './admin';
import { PageID } from './pageId';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { initialTask } from './forms';
import { initialEditTask } from './formEdit';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({

            tasks: Tasks,
            task: Task,
            image: Image,
            admin: Admin,
            pageId: PageID,

            ...createForms({
                task: initialTask,
                editTask: initialEditTask
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}