import {
  ADD_POST,
  REMOVE_POST,
  GET_POST,
  GET_POSTS,
  UPDATE_VOTE_POSTS
} from "../../actions/posts/actionsTypes";

const INITIAL_STATE = {
  posts: [{}],
  post: {
    id: "",
    timestamp: Date.now(),
    title: "",
    body: "",
    author: "",
    category: "",
    voteScore: "",
    deleted: false
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
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
    case UPDATE_VOTE_POSTS:
      return {
        ...state,
        posts: (postUpdated => {
          return state.posts.map(post => {
            if (post.id === postUpdated.id) {
              return postUpdated;
            }

            return post;
          });
        })(action.payload),
        post: action.payload
      };

    default:
      return state;
  }
};
