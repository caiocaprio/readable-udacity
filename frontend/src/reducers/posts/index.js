import {
  ADD_POST,
  REMOVE_POST,
  GET_POST,
  GET_POSTS
} from '../../actions/posts/actionsTypes';

const INITIAL_STATE = {
  posts: [
    {
      id: '',
      timestamp: Date.now(),
      title: '',
      body: '',
      author: '',
      category: '',
      voteScore: '',
      deleted: false
    }
  ],
  post: {
    id: '',
    timestamp: Date.now(),
    title: '',
    body: '',
    author: '',
    category: '',
    voteScore: '',
    deleted: false
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state
      };
    case ADD_POST:
      return {
        ...state
      };
    case REMOVE_POST:
      return {
        ...state
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload
      };

    default:
      return state;
  }
};
