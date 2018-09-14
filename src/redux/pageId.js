import * as ActionTypes from './ActionTypes';

export const PageID = (state = { pageId: 1 }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_IMAGE:
            return { ...state, pageId: action.payload };

        default:
            return state;
    }
};


