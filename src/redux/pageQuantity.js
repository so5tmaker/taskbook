import * as ActionTypes from './ActionTypes';

export const PageQuantity = (state = { pageQuantity: 1 }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PAGEQUANTITY:
            return { ...state, pageQuantity: action.payload };

        default:
            return state;
    }
};


