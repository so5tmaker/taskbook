import * as ActionTypes from './ActionTypes';
import { rmtUrl } from '../shared/baseUrl';

export const postTask = (task) => (dispatch) => {
    console.log('Post Task Submit', task);
    task = { ...task }

    let form = new FormData();
    form.append("username", task.username);
    form.append("email", task.email);
    form.append("text", task.text);

    return fetch(rmtUrl + 'create?developer=Example', {
        method: "POST",
        body: JSON.stringify(task.fileUpload[0]),
        headers: {
            'Accept': 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
            "mimeType": "multipart/form-data",
            "processData": false,
            "dataType": "json",
            "crossDomain": true,
        },
        data: form,
        credentials: "same-origin"
    })
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
                throw error;
            })
        .then(response => response.json())
        .then(response => { dispatch(addTasks(response)); alert("Thank you for your task!\n" + JSON.stringify(response)); })
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
