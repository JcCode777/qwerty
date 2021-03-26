import * as ActionTypes from './ActionTypes';

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionType.ADD_COMMENT,
    payload: {
        campsiteId,
        rating,
        author,
        text,
    }
})