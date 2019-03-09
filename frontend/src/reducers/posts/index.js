import { ADD_POST, GET_POST, GET_POSTS, UPDATE_POST, POST_NOT_FOUND } from '../../actions/posts/actionsTypes';
const POST_DEFAULT = {
	id: '',
	timestamp: Date.now(),
	title: '',
	body: '',
	author: '',
	category: '',
	voteScore: '',
	deleted: false
};
const INITIAL_STATE = {
	posts: [],
	post: POST_DEFAULT
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
				...state,
				posts: [ ...state.posts, action.payload ]
			};
		case GET_POST:
			return {
				...state,
				post: action.payload
			};
		case POST_NOT_FOUND:
			return {
				...state,
				post: {
					...POST_DEFAULT,
					deleted: true
				}
			};
		case UPDATE_POST:
			return {
				...state,
				posts: ((postUpdated) => state.posts.map((post) => (post.id === postUpdated.id ? postUpdated : post)))(
					action.payload
				),
				post: action.payload.deleted ? POST_DEFAULT : action.payload
			};

		default:
			return state;
	}
};
