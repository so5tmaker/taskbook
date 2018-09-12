import * as ActionTypes from './ActionTypes';
import { rmtUrl } from '../shared/baseUrl';
import axios from 'axios';

export const setImage = (image) => (dispatch) => {
    dispatch(addImage(image));
}

export const addImage = (image) => ({
    type: ActionTypes.ADD_IMAGE,
    payload: image
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
            console.log('response', response);
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
