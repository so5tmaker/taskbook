import * as ActionTypes from './ActionTypes';
import { rmtUrl } from '../shared/baseUrl';
import axios from 'axios';
import md5 from 'md5';
import { actions } from 'react-redux-form';

const developer = "Viktor";

export const setImage = (image) => (dispatch) => {
    dispatch(addImage(image));
}

export const addImage = (image) => ({
    type: ActionTypes.ADD_IMAGE,
    payload: image
});

export const setAdmin = (admin) => (dispatch) => {
    dispatch(addAdmin(admin));
}

export const addAdmin = (admin) => ({
    type: ActionTypes.ADD_ADMIN,
    payload: admin
});

export const setPageID = (pageId) => (dispatch) => {
    dispatch(addPageID(pageId));
}

export const addPageID = (pageId) => ({
    type: ActionTypes.ADD_PAGEID,
    payload: pageId
});

export const addFieldsValues = (values) => ({
    type: ActionTypes.ADD_FIELDSVALUES,
    payload: values
});

export const TaskLoading = () => ({
    type: ActionTypes.TASK_LOADING
});

export const TaskFailed = (errMess) => ({
    type: ActionTypes.TASK_FAILED,
    payload: errMess
});

export const addTask = (task) => ({
    type: ActionTypes.ADD_TASK,
    payload: task
});

export const TasksLoading = () => ({
    type: ActionTypes.TASKS_LOADING
});

export const TasksFailed = (errMess) => ({
    type: ActionTypes.TASKS_FAILED,
    payload: errMess
});

export const addTasks = (tasks) => ({
    type: ActionTypes.ADD_TASKS,
    payload: tasks
});

export const setDefaultFormValues = (values) => (dispatch) => {
    dispatch(addDefaultFormValues(values));
}

export const addDefaultFormValues = (values) => ({
    type: ActionTypes.ADD_DEFAULTFORMVALUES,
    payload: values
});

export const setDefaultValues = (values) => (dispatch) => {
    dispatch(actions.merge('editTask', values));
}

export const postTask = (task) => (dispatch) => {

    dispatch(TaskLoading(true));

    let formData = new FormData();
    var fileField = document.querySelector("input[type='file']");
    formData.append("username", task.username);
    formData.append("email", task.email);
    formData.append("text", task.text);
    formData.append("image", fileField.files[0]);

    return axios({
        url: `${rmtUrl}create?developer=${developer}`,
        type: 'POST',
        data: formData,
        crossDomain: true,
        processData: false,
        contentType: false,
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'POST',
        dataType: "json",
    })
        .then(response => {
            if (response.data.status === "ok") {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => { dispatch(addTask(response)); window.location.replace("/home"); })
        .catch(error => { dispatch(TaskFailed(error.message)); });

};

export const editTask = (task, taskId) => (dispatch) => {

    dispatch(TaskLoading(true));

    let encode = str => {
        return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    }

    let status = task.status ? 10 : 0;
    let paramStatus = encode('status');
    status = encode(status);
    let paramText = encode('text');
    let text = encode(task.text);

    let paramsString = `${paramStatus}=${status}&${paramText}=${text}&token=beejee`;
    let signature = md5(paramsString);
    let endParams = paramsString + `&${encode('signature')}=${signature}`;

    return axios({
        url: `${rmtUrl}edit/${taskId}?developer=${developer}`,
        type: 'POST',
        data: endParams,
        crossDomain: true,
        processData: false,
        contentType: false,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        method: 'POST',
        dataType: "json",
    })
        .then(response => {
            if (response.data.status === "ok") {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => { window.location.replace("/home"); console.log('edit task - ok', JSON.stringify(response.data)); })
        .catch(error => { dispatch(TaskFailed(error.message)); console.log('edit task - error', error); alert('Your task could not be edited\nError: ' + error.message); });

};

export const fetchTasks = (pageId, sortField = 'id', sortDirection = 'asc') => (dispatch) => {

    dispatch(TasksLoading(true));

    return fetch(`${rmtUrl}?developer=${developer}&page=${pageId}&sort_field=${sortField}&sort_direction=${sortDirection}`)
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(tasks => {
            dispatch(addPageID(pageId));
            dispatch(addFieldsValues({ sortfield: sortField, sortdirection: sortDirection }));
            dispatch(addTasks(tasks.message));
        })
        .catch(error => dispatch(TasksFailed(error.message)));
}

export const fetchTaskById = (taskId) => (dispatch) => {

    return fetch(`${rmtUrl}?developer=${developer}`)
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(tasks => {
            let task = tasks.message.tasks.filter(task => task.id === parseInt(taskId, 10))[0]
            if (task) {
                dispatch(addTask(task));
            }
        })
        .catch(error => dispatch(TaskFailed(error.message)));
}
