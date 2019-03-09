import {
	ADD_COMMENT,
	REMOVE_COMMENT,
	GET_COMMENT,
	GET_COMMENTS,
	UPDATE_COMMENT
} from '../../actions/comments/actionsTypes';

const COMMENT_DEFAULT = {
	id: '',
	parentId: '',
	timestamp: Date.now(),
	body: '',
	author: '',
	voteScore: '',
	deleted: false,
	parentDeleted: false
};

const INITIAL_STATE = {
	comments: [],
	comment: COMMENT_DEFAULT
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
				comments: [ ...state.comments, action.payload ]
			};
		case REMOVE_COMMENT:
			return {
				...state,
				comments: state.comments.filter((comment) => comment.id != action.payload)
			};
		case GET_COMMENT:
			return {
				...state,
				comment: action.payload
			};
		case UPDATE_COMMENT:
			return {
				...state,
				comments: ((commentUpdated) => {
					return state.comments.map((comment) => {
						if (comment.id === commentUpdated.id) {
							return commentUpdated;
						}

						return comment;
					});
				})(action.payload),
				comment: COMMENT_DEFAULT
			};

		default:
			return state;
	}
};
