import * as ActionTypes from './ActionTypes';

export const FormValues = (state = { formValues: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DEFAULTFORMVALUES:
            return { ...state, formValues: action.payload };

        default:
            return state;
    }
};


