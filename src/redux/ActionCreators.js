import * as ActionTypes from './ActionTypes';
import { TASKS } from '../shared/tasks';

export const fetchTasks = () => (dispatch) => {

    dispatch(TasksLoading(true));

    setTimeout(() => {
        dispatch(addTasks(TASKS));
    }, 2000);
}

export const TasksLoading = () => ({
    type: ActionTypes.TASKS_LOADING
});

export const TasksFailed = (errMess) => ({
    type: ActionTypes.TASKS_FAILED,
    payload: errMess
});

export const addTasks = (username, email, text, status, image_path = 'https://uxcandy.com/~shapoval/test-task-backend/upload/user_images/5900dfd7/1508836540_1.jpg') => ({
    type: ActionTypes.ADD_TASKS,
    payload: {
        username: username,
        email: email,
        text: text,
        status: status,
        image_path: image_path
    }
});
