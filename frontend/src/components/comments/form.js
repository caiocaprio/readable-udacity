import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCommentInPost, updateComment, getComment } from '../../actions/comments';
import { confirmAlert } from 'react-confirm-alert';
import { Master } from '../templates';
import { getPost } from '../../actions/posts';

export class FormComment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			comment: {
				id: '',
				timestamp: 0,
				author: '',
				body: '',
				parentId: ''
			},
			author: false,
			body: false
		};
		this.onClickSubmit = this.onClickSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.submitComment = this.submitComment.bind(this);
		this.onClickCancel = this.onClickCancel.bind(this);
		this.resetState = this.resetState.bind(this);
	}
	async componentDidMount() {
		const { comment_id, action } = this.props.match.params;
		const { post } = this.props;

		let comment = null;
		if (comment_id) {
			comment = await this.props.getComment(comment_id);
		}

		if (post && post.id == '' && (comment && comment.parentId)) {
			await this.props.getPost(comment.parentId);
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.post && nextProps.post.id != prevState.comment.parentId) {
			return {
				comment: { ...prevState.comment, parentId: nextProps.post.id },
				author: nextProps.comment && nextProps.comment.author != '' ? true : false,
				body: nextProps.comment && nextProps.comment.body != '' ? true : false
			};
		}

		if (nextProps.comment && nextProps.comment.id !== prevState.comment.id) {
			return {
				comment: nextProps.comment,
				author: nextProps.comment.author != '' ? true : false,
				body: nextProps.comment.body != '' ? true : false
			};
		}
		return null;
	}

	validate() {
		const { author, body } = this.state;

		return author && body;
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value !== '',
			comment: { ...this.state.comment, [e.target.name]: e.target.value }
		});
	}

	resetState() {
		this.setState({
			comment: {
				id: '',
				timestamp: 0,
				author: '',
				body: '',
				parentId: ''
			},
			author: false,
			body: false
		});
	}

	async submitComment() {
		if (this.validate()) {
			const { comment } = this.state;
			comment.timestamp = Date.now();

			if (comment.id == '') {
				comment.id = Math.random().toString(36).substr(2, 9);
				await this.props.addCommentInPost(comment);
				this.resetState();
			} else {
				await this.props.updateComment(comment);
				this.resetState();
				this.onClickCancel(null);
			}
		}
	}

	onClickSubmit(e) {
		e.preventDefault();
		confirmAlert({
			title: [ <b>{this.state.comment.author}</b>, `, confirm to submit ?` ],
			message: [ <b>{this.state.comment.body}</b> ],
			buttons: [
				{
					label: 'Yes',
					onClick: () => this.submitComment()
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

	getForm() {
		const { comment: { author, body, id } } = this.state;
		return (
			<div className="is-clearfix">
				<div className="field">
					<label className="label">Author</label>
					<div className="control">
						<input
							className="input"
							name="author"
							type="text"
							placeholder=""
							disabled={id !== ''}
							onChange={this.onChange}
							value={author}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Body</label>
					<div className="control">
						<textarea
							className="textarea"
							name="body"
							placeholder=""
							onChange={this.onChange}
							value={body}
						/>
					</div>
				</div>
				<div className="field is-grouped is-pulled-right ">
					<div className="control ">
						<button className="button is-link" onClick={this.onClickSubmit}>
							Submit
						</button>
					</div>
				</div>
			</div>
		);
	}

	onClickCancel(e) {
		const { post: { category, id } } = this.props;
		if (id !== '') {
			this.props.history.push({ pathname: `/${category}/${id}` });
		} else {
			this.props.history.push({ pathname: `/` });
		}
	}

	render() {
		const { comment: { id } } = this.state;
		const { match: { params: { action } } } = this.props;

		return action ? (
			<Master {...this.props}>
				<div className="container">
					<section className="articles">
						<div className="column is-8 is-offset-2">
							<div className="container-title">
								<h1 className="title is-pulled-left">{id == '' ? 'New' : 'Edit'} Comment</h1>
								<div className="buttons ">
									<button className="button is-link is-pulled-right" onClick={this.onClickCancel}>
										<span class="icon">
											<i class="fas fa-arrow-left" />
										</span>
										back
									</button>
								</div>
							</div>
							{this.getForm()}
						</div>
					</section>
				</div>
			</Master>
		) : (
			this.getForm()
		);
	}
}

FormComment.propTypes = {
	comment: PropTypes.shape({
		id: PropTypes.string,
		timestamp: PropTypes.number,
		author: PropTypes.string,
		body: PropTypes.string,
		parentId: PropTypes.string
	}),
	author: PropTypes.bool,
	body: PropTypes.bool
};

const mapStateToProps = ({ CommentsReducer, PostsReducer }) => ({ ...CommentsReducer, PostsReducer });

const mapDispatchToProps = {
	addCommentInPost,
	updateComment,
	getComment,
	getPost
};

export default connect(mapStateToProps, mapDispatchToProps)(FormComment);
