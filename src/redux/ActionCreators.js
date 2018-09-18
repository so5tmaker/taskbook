import * as ActionTypes from './ActionTypes';
import { rmtUrl } from '../shared/baseUrl';
import axios from 'axios';
import md5 from 'md5';
import validUrl from 'valid-url';

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

export const TaskFailed = (errMess) => ({
    type: ActionTypes.TASK_FAILED,
    payload: errMess
});

export const addTask = (task) => ({
    type: ActionTypes.ADD_TASK,
    payload: task
});

export const postTask = (task) => (dispatch) => {

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
        .then(response => { dispatch(addTasks(response)); alert("Thank you for your task!\n" + JSON.stringify(response.data)); })
        .catch(error => { console.log('post task', error.message); alert('Your task could not be posted\nError: ' + error.message); });

};

export const editTask = (task, taskId) => (dispatch) => {

    let formData = new FormData();
    let token = '&token=beejee';
    let status = task.status ? 10 : 0;
    formData.append("status", status);
    formData.append("text", task.text);
    formData.append("token", token);
    let paramsString = `status=${status}&text=${task.text}${token}`;
    let paramsStringCode = encodeURIComponent(paramsString).replace(/[!'()*]/g, (c) => {
        return '%' + c.charCodeAt(0).toString(16);
    });
    //let paramsStringCode = encodeURIComponent(paramsString).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");

    let signature = md5(paramsStringCode);
    formData.append("signature", signature);
    let endParams = paramsStringCode + '&signature=' + signature;

    if (validUrl.isUri(rmtUrl + `/edit/${taskId}/?${endParams}`)) {
        console.log('Looks like an URI');
    } else {
        console.log('Not a URI');
    }

    return axios({
        url: rmtUrl + `/edit/${taskId}/?${endParams}`,
        type: 'POST',
        //data: endParams,
        crossDomain: true,
        processData: false,
        contentType: false,
        headers: { 'Content-Type': 'x-www-form-urlencoded' },
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
        .then(response => { dispatch(addTasks(response)); alert("Thank you for your task!\n" + JSON.stringify(response.data)); })
        .catch(error => { console.log('post task', error); });

};

export const fetchTasks = (pageId, sortField = 'username', sortDirection = 'asc') => (dispatch) => {

    dispatch(TasksLoading(false));

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
        }, // if there is response
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }) // no response
        .then(response => response.json())
        .then(tasks => dispatch(addTask(tasks.message.tasks.filter(task => task.id === parseInt(taskId, 10))[0])))
        .catch(error => dispatch(TaskFailed(error.message)));
}

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
