import * as ActionTypes from './ActionTypes';

export const addTask = (username, email, text, status, image_path = 'https://uxcandy.com/~shapoval/test-task-backend/upload/user_images/5900dfd7/1508836540_1.jpg') => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        username: username,
        email: email,
        text: text,
        status: status,
        image_path: image_path
    }
});