import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_COMMENT,
  UPDATE_VOTE_COMMENT,
  GET_COMMENTS
} from "../../actions/comments/actionsTypes";

const INITIAL_STATE = {
  comments: [
    {
      id: "",
      parentId: "",
      timestamp: Date.now(),
      body: "",
      author: "",
      voteScore: "",
      deleted: false,
      parentDeleted: false
    }
  ],
  comment: {
    id: "",
    parentId: "",
    timestamp: Date.now(),
    body: "",
    author: "",
    voteScore: "",
    deleted: false,
    parentDeleted: false
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: action.payload
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        comments: action.payload
      };
    case GET_COMMENT:
      return {
        ...state,
        comment: action.payload
      };
    case UPDATE_VOTE_COMMENT:
      return {
        ...state,
        comments: (commentUpdated => {
          return state.comments.map(comment => {
            if (comment.id === commentUpdated.id) {
              return commentUpdated;
            }

            return comment;
          });
        })(action.payload),
        comment: action.payload
      };

    default:
      return state;
  }
};
