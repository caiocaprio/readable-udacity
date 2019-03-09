import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VoteScoreComment from '../vote-score-comment';

import FormComment from '../comments/form';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deteleComment } from '../../actions/comments';
export class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onConfirmDelete = this.onConfirmDelete.bind(this);
		this.deleteComment = this.deleteComment.bind(this);
	}

	onConfirmDelete(id, body) {
		confirmAlert({
			title: [ <b>Do you really want to delete?</b> ],
			message: body,
			buttons: [
				{
					label: 'Yes',
					onClick: async () => await this.deleteComment(id)
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

	async deleteComment(id) {
		await this.props.deteleComment(id);
	}

	render() {
		const { comments } = this.props;

		return (
			<Fragment>
				<div className="container-title">
					<h3>Comments</h3>
				</div>

				{comments.filter((e) => !e.deleted).map((comment) => {
					const { author, body, deleted, id, parentDeleted, parentId, timestamp, voteScore } = comment;
					return (
						<article className="message">
							<div className="buttons-top is-pulled-right">
								<Link className="button is-white icon" to={`/comment/edit/${id}`}>
									<i class="fas fa-edit" />
								</Link>
								<button
									className="button is-white icon "
									onClick={() => this.onConfirmDelete(id, body)}
								>
									<i class="fas fa-trash-alt" />
								</button>
							</div>
							<div className="message-body">
								<div>{body}</div>
								<span className="author">by {author} </span>
								<span>&nbsp;|&nbsp;</span>
								<i className={`fas fa-star`} />
								<span
									className={
										`vote-score ` + (voteScore > 0 ? 'green' : voteScore == 0 ? 'grey' : 'red')
									}
								>
									{' '}
									{voteScore}
								</span>
								<VoteScoreComment {...this.props} id={id} />
							</div>
							<div className="message-footer" />
						</article>
					);
				})}
				<FormComment {...this.props} />
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
	deteleComment
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
