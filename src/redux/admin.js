import * as ActionTypes from './ActionTypes';

export const Admin = (state = { admin: false }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ADMIN:
            return { ...state, admin: action.payload };

        default:
            return state;
    }
};


