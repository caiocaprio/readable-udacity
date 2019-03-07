import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  REMOVE_POST,
  UPDATE_VOTE_POSTS
} from "./actionsTypes";

import { api, headers } from "../../contants";

// Generate a unique token for storing your bookshelf data on the backend server.
// let token = localStorage.token;
// if (!token)
//   token = localStorage.token = Math.random()
//     .toString(36)
//     .substr(-8);

export const getAllPosts = () => async dispatch => {
  const response = await fetch(`${api}/posts`, { headers });
  const payload = await response.json();
  dispatch({
    type: GET_POSTS,
    payload
  });
};

export const getPostsInCategory = category =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data.posts);

export const addPost = post => async dispatch => {
  const response = await fetch(`${api}/posts`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...post })
  });
  const payload = await response.json();
  dispatch({
    type: GET_POSTS,
    payload
  });
};

export const getPost = id => async dispatch => {
  const response = await fetch(`${api}/posts/${id}`, { headers });
  const payload = await response.json();
  dispatch({
    type: GET_POST,
    payload
  });
};

export const updatePost = (id, title, body) => async dispatch => {
  const response = await fetch(`${api}/posts/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title,body })
  })
  const payload = await response.json();
  dispatch({
    type: GET_POST,
    payload
  });
}

export const updateVoteInPost = (id, option) => async dispatch => {
  const response = await fetch(`${api}/posts/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option })
  });

  const payload = await response.json();

  dispatch({
    type: UPDATE_VOTE_POSTS,
    payload
  });
};

// export const search = query =>
//   fetch(`${api}/search`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query })
//   })
//     .then(res => res.json())
//     .then(data => data.books);
