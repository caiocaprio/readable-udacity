import {
	GET_COMMENTS,
	GET_COMMENT,
	ADD_COMMENT,
	UPDATE_COMMENT,
	REMOVE_COMMENT
} from '../../actions/comments/actionsTypes';

import { api, headers } from '../../contants';

export const getCommentsInPost = (idPost) => async (dispatch) => {
	const response = await fetch(`${api}/posts/${idPost}/comments`, {
		headers
	});
	const payload = await response.json();
	dispatch({
		type: GET_COMMENTS,
		payload
	});

	return payload;
};

export const addCommentInPost = (comment) => async (dispatch) => {
	const response = await fetch(`${api}/comments`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ ...comment })
	});
	const payload = await response.json();
	dispatch({
		type: ADD_COMMENT,
		payload
	});
};

export const getComment = (id) => async (dispatch) => {
	const response = await fetch(`${api}/comments/${id}`, { headers });
	const payload = await response.json();
	dispatch({
		type: GET_COMMENT,
		payload
	});

	return payload;
};

export const deteleComment = (id) => async (dispatch) => {
	const response = await fetch(`${api}/comments/${id}`, { method: 'DELETE', headers });
	const payload = await response.json();

	dispatch({
		type: REMOVE_COMMENT,
		payload: id
	});

	return payload;
};

export const updateVoteInComment = (id, option) => async (dispatch) => {
	const response = await fetch(`${api}/comments/${id}`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ option })
	});

	const payload = await response.json();

	dispatch({
		type: UPDATE_COMMENT,
		payload
	});
};

export const updateComment = (comment) => async (dispatch) => {
	const response = await fetch(`${api}/comments/${comment.id}`, {
		method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ body: comment.body, timestamp: comment.timestamp })
	});

	const payload = await response.json();

	dispatch({
		type: UPDATE_COMMENT,
		payload
	});

	return payload;
};
