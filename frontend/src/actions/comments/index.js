import {
  GET_COMMENTS,
  GET_COMMENT,
  REMOVE_COMMENT,
  UPDATE_VOTE_COMMENT
} from "../../actions/comments/actionsTypes";

const api = "http://localhost:3001";

const headers = {
  Accept: "application/json",
  Authorization: "whatever-you-want"
};

export const getCommentsInPost = idPost => async dispatch => {
  console.log("GET_COMMENTS", idPost);
  const response = await fetch(`${api}/posts/${idPost}/comments`, { headers });
  const payload = await response.json();
  dispatch({
    type: GET_COMMENTS,
    payload
  });
};

export const addCommentInPost = comment =>
  fetch(`${api}/comments`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ comment })
  })
    .then(res => res.json())
    .then(data => data.comments);

export const getComment = id => async dispatch => {
  const response = await fetch(`${api}/comments/${id}`, { headers });
  const payload = await response.json();
  dispatch({
    type: GET_COMMENT,
    payload
  });
};

export const updateVoteInComment = (id, option) => async dispatch => {
  const response = await fetch(`${api}/comments/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option })
  });

  const payload = await response.json();

  dispatch({
    type: UPDATE_VOTE_COMMENT,
    payload
  });
};

export const updateComment = (id, comment) =>
  fetch(`${api}/comments/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ comment })
  }).then(res => res.json());
