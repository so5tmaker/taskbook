import * as ActionTypes from './ActionTypes';

export const PageID = (state = { pageId: "1" }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PAGEID:
            return { ...state, pageId: action.payload };

        default:
            return state;
    }
};


