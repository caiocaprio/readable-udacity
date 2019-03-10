import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost, updateVoteInPost, deletePost } from '../../actions/posts';
import { getCommentsInPost, updateVoteInComment } from '../../actions/comments';
import { Link } from 'react-router-dom';
import VoteScorePost from '../vote-score-post';
import Comments from '../comments';
import { Master } from '../templates';
import './index.scss';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import PropTypes from 'prop-types';
class PostDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			order: null,
			edit: false,
			post: {
				category: '',
				id: '',
				title: '',
				voteScore: '',
				commentCount: '',
				body: '',
				author: '',
				timestamp: '',
				deleted: false
			},
			comments: null
		};
	}

	async componentDidMount() {
		const { match: { params: { post_id } } } = this.props;

		await this.props.getPost(post_id);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.post && nextProps.post.id != prevState.post.id) {
			return { post: nextProps.post };
		}
		return null;
	}

	async shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.post.deleted) {
			return this.gotoPageNotFound();
		} else if (nextProps.post.id != '' && nextProps.post.commentCount > 0 && nextProps.comments.length == 0) {
			await this.props.getCommentsInPost(nextState.post.id);
		}

		return true;
	}

	gotoPageNotFound() {
		this.props.history.push({ pathname: '/error/404' });
	}

	setEdit(edit) {
		this.setState({ edit: edit });
	}

	onClickEdit(e) {
		e.preventDefault();
		this.setState({ edit: true });
	}

	onConfirmDelete(id, body) {
		confirmAlert({
			title: [ <b>Do you really want to delete?</b> ],
			message: body,
			buttons: [
				{
					label: 'Yes',
					onClick: async () => await this.deletePost(id)
				},
				{
					label: 'No',
					onClick: () => {
						return;
					}
				}
			]
		});
	}

	async deletePost(id) {
		await this.props.deletePost(id);

		this.props.history.push({ pathname: '/' });
	}

	render() {
		const {
			post,
			post: { category, id, title, voteScore, commentCount, body, author, timestamp },
			comments
		} = this.props;

		const { edit } = this.state;

		const d = new Date(timestamp);

		return (
			<Master {...this.props}>
				<div className="container">
					<section className="articles">
						<div className="column is-8 is-offset-2">
							<div className="container-title">
								<h1 className="title is-pulled-left">Post</h1>
								<div className="buttons ">
									<Link className="button is-link is-pulled-left" to={`/`}>
										<span class="icon">
											<i class="fas fa-arrow-left" />
										</span>
										back
									</Link>
								</div>
							</div>
							<div key={id} className="card article">
								<div className="card-content">
									<div className="content ">
										<div className="buttons-top is-pulled-right">
											<Link className="button is-white icon" to={`/post/edit/${id}`}>
												<i class="fas fa-edit" />
											</Link>
											<button
												className="button is-white icon"
												onClick={() => this.onConfirmDelete(id, body)}
											>
												<i class="fas fa-trash-alt" />
											</button>
										</div>
										<div className="article-header">
											<h2 className="title article-title">{title}</h2>
											<div className="box-info-post">
												<span className="date-posted">
													{`Posted on ${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`}
												</span>
												<span>&nbsp;|&nbsp;</span>
												<span className="author">by {author} </span>
												<span>&nbsp;|&nbsp;</span>
												<i className={`fas fa-star`} />
												<span
													className={
														`vote-score ` +
														(voteScore > 0 ? 'green' : voteScore == 0 ? 'grey' : 'red')
													}
												>
													{' '}
													{voteScore}
												</span>
												<span>&nbsp;|&nbsp;</span>
												<span className="comments-count has-text-grey-light">
													<i className="fa fa-comments" /> {commentCount} Comentários
												</span>
											</div>
										</div>
										<div className="article-body">
											<p>{body}</p>
										</div>
										<div className="article-footer">
											<div className="tags has-addons ">
												<Link to={`/${category}`} className="tag is-rounded is-info">
													{category}
												</Link>
											</div>
											<VoteScorePost {...this.props} id={id} />

											<Comments {...this.props} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</Master>
		);
	}
}

const mapStateToProps = ({ CommentsReducer, PostsReducer }) => ({
	...CommentsReducer,
	...PostsReducer
});

PostDetail.propTypes = {
	order: PropTypes.string,
	edit: PropTypes.bool,
	post: PropTypes.shape({
		category: PropTypes.string,
		id: PropTypes.string,
		title: PropTypes.string,
		voteScore: PropTypes.string,
		commentCount: PropTypes.string,
		body: PropTypes.string,
		author: PropTypes.string,
		timestamp: PropTypes.string,
		deleted: PropTypes.bool
	}),
	comments: PropTypes.array
};

export default connect(mapStateToProps, {
	getPost,
	getCommentsInPost,
	updateVoteInPost,
	updateVoteInComment,
	deletePost
})(PostDetail);
