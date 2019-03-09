import {
	ADD_POST,
	GET_POST,
	GET_POSTS,
	UPDATE_POST,
	POST_NOT_FOUND,
	UPDATE_VOTE_IN_POST
} from '../../actions/posts/actionsTypes';
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
			return Object.assign({}, state, {
				posts: [ ...state.posts, action.payload ]
			});

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
		case UPDATE_VOTE_IN_POST:
			let newPost = { ...state.post };

			const getNewPostUpdated = (post, vote) => {
				return {
					...post,
					voteScore: vote == 'upVote' ? ++post.voteScore : --post.voteScore
				};
			};

			if (state.posts.length > 0) {
				state.posts.map((post) => {
					if (post.id == action.payload.id) {
						newPost = getNewPostUpdated(post, action.payload.option);
						return newPost;
					}
					return post;
				});
			} else {
				newPost = getNewPostUpdated(state.post, action.payload.option);
			}

			return {
				...state,
				post: newPost
			};

		default:
			return state;
	}
};
