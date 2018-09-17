import * as ActionTypes from './ActionTypes';

export const FieldValues = (state = { fieldValues: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FIELDSVALUES:
            return { ...state, fieldValues: action.payload };

        default:
            return state;
    }
};


