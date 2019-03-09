import { ADD_POST, GET_POSTS, GET_POST, UPDATE_POST, POST_NOT_FOUND } from './actionsTypes';

import { api, headers } from '../../contants';

export const getAllPosts = () => async (dispatch) => {
	const response = await fetch(`${api}/posts`, { headers });
	const payload = await response.json();
	dispatch({
		type: GET_POSTS,
		payload
	});
};

export const getPostsInCategory = (category) =>
	fetch(`${api}/${category}/posts`, { headers }).then((res) => res.json()).then((data) => data.posts);

export const addPost = (post) => async (dispatch) => {
	const response = await fetch(`${api}/posts`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ ...post })
	});
	const payload = await response.json();
	dispatch({
		type: ADD_POST,
		payload
	});
};

export const getPost = (id) => async (dispatch) => {
	const response = await fetch(`${api}/posts/${id}`, { headers });
	const payload = await response.json();

	if (!payload.id || payload.deleted)
		return dispatch({
			type: POST_NOT_FOUND,
			payload
		});

	dispatch({
		type: GET_POST,
		payload
	});
};

export const updatePost = (id, title, body) => async (dispatch) => {
	const response = await fetch(`${api}/posts/${id}`, {
		method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ title, body })
	});
	const payload = await response.json();
	dispatch({
		type: UPDATE_POST,
		payload
	});
};

export const deletePost = (id) => async (dispatch) => {
	const response = await fetch(`${api}/posts/${id}`, {
		method: 'DELETE',
		headers
	});
	const payload = await response.json();
	dispatch({
		type: UPDATE_POST,
		payload
	});
};

export const updateVoteInPost = (id, option) => async (dispatch) => {
	const response = await fetch(`${api}/posts/${id}`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ option })
	});

	const payload = await response.json();

	dispatch({
		type: UPDATE_POST,
		payload
	});
};
