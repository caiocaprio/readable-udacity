import { ADD_POST, GET_POSTS, GET_POST, REMOVE_POST } from './actionsTypes';

const api = 'http://localhost:3001';

// Generate a unique token for storing your bookshelf data on the backend server.
// let token = localStorage.token;
// if (!token)
//   token = localStorage.token = Math.random()
//     .toString(36)
//     .substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: 'whatever-you-want'
};

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

export const addPost = query =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })
    .then(res => res.json())
    .then(data => data.posts);

export const getPost = id =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data.posts);

export const updatePost = (id, post) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ post })
  }).then(res => res.json());

export const updateVoteInPost = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify({option})
  })
    .then(res => res.json())
    .then(data => data.posts);

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
