import * as ActionTypes from './ActionTypes';
import { rmtUrl } from '../shared/baseUrl';
import axios from 'axios';
import md5 from 'md5';

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
        url: rmtUrl + 'create?developer=Example',
        type: 'POST',
        data: formData,
        crossDomain: true,
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
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
    let token = 'beejee';
    let status = task.status ? 10 : 0;
    formData.append("status", status);
    console.log("status", taskId);
    formData.append("text", task.text);
    formData.append("token", token);
    let paramsString = `status=${status}&text=${task.text}`;
    paramsString = encodeURIComponent(paramsString).replace(/[!'()]/g, escape).replace(/\*/g, "%2A") + '&token=beejee';
    console.log("paramsString", paramsString);
    let signature = md5(paramsString);
    formData.append("signature", signature);
    let endParams = paramsString  + '&signature=' + signature;
//?${endParams}
    return axios({
        url: rmtUrl + `/edit/${taskId}`,
        type: 'POST',
        data: endParams,
        crossDomain: true,
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        headers: { 'Content-Type': 'text/plain' },
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
        .catch(error => { console.log('post task', error); /*alert('Your task could not be posted\nError: ' + error.message);*/ });

};

export const fetchTasks = () => (dispatch) => {

    dispatch(TasksLoading(true));

    return fetch(rmtUrl + '?developer=Example')
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
        .then(tasks => dispatch(addTasks(tasks.message.tasks)))
        .catch(error => dispatch(TasksFailed(error.message)));
}

export const fetchTaskById = (taskId) => (dispatch) => {

    return fetch(rmtUrl + '?developer=Example')
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
