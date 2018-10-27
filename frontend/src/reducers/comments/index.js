import {
  ADD_POST,
  REMOVE_POST,
  GET_POST,
  GET_POSTS
} from '../../actions/posts/actionsTypes';

const INITIAL_STATE = {
  comments: [
    {
      id: '',
      parentId: '',
      timestamp: Date.now(),
      body: '',
      author: '',
      voteScore: '',
      deleted: false,
      parentDeleted: false
    }
  ]
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
