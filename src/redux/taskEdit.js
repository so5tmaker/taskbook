import * as ActionTypes from './ActionTypes';

export const Task = (state = { 
    errMess: null,
    task:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TASK:
            return {...state, errMess: null, task: action.payload};

        case ActionTypes.TASK_FAILED:
            return {...state, errMess: action.payload};

        default:
            return state;
    }
};