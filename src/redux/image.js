import * as ActionTypes from './ActionTypes';

export const Image = (state = { image: null }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_IMAGE:
            return { ...state, image: action.payload };

        default:
            return state;
    }
};


