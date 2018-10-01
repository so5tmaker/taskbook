import * as ActionTypes from './ActionTypes';

export const Task = (state = {
    isLoading: true,
    errMess: null,
    task: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TASK:
            return { ...state, isLoading: false, errMess: null, task: action.payload };

        case ActionTypes.TASK_LOADING:
            return { ...state, isLoading: true, errMess: null, task: [] }

        case ActionTypes.TASK_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};