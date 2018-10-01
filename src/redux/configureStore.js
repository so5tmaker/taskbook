import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';

import { Tasks } from './tasks';
import { Task } from './taskEdit';
import { Image } from './image';
import { Admin } from './admin';
import { PageID } from './pageId';
import { FieldValues } from './fieldValues';
import { FormValues } from './formValues';

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
            fieldValues: FieldValues,
            formValues: FormValues,

            ...createForms({
                createTask: initialTask,
                editTask: initialEditTask
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}