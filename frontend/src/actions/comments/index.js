

const api = 'http://localhost:3001';

const headers = {
  Accept: 'application/json',
  Authorization: 'whatever-you-want'
};

export const getCommentsInPost = idPost =>
  fetch(`${api}/posts/${idPost}/comments`, { headers })
    .then(res => res.json())

export const addCommentInPost = comment =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment })
  })
    .then(res => res.json())
    .then(data => data.comments);

export const getComment = id =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())
    .then(data => data.comments);

export const updateVoteInComment = (id, body) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ body })
  })
    .then(res => res.json())
    .then(data => data.posts);

export const updateComment = (id, comment) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment })
  }).then(res => res.json());
