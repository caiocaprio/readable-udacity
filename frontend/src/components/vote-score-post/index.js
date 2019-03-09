import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class VoteScorePost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: null
		};

		this.onClick = this.onClick.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		const { id } = props;
		return {
			id: id ? id : state.id
		};
	}

	resetFocus() {
		document.getElementById('root').focus();
	}

	onClick(e) {
		const { updateVoteInPost } = this.props;

		if (e.target.className.indexOf('bt-notlike') != -1) {
			updateVoteInPost(this.state.id, 'downVote');
		} else {
			updateVoteInPost(this.state.id, 'upVote');
		}
		this.resetFocus();
	}

	render() {
		return (
			<div ref={this.sectionFocusEl}>
				<button className={`button bt-like is-success is-outlined`} onClick={this.onClick}>
					<i className="far fa-thumbs-up" />
					&nbsp;Like
				</button>
				&nbsp;
				<button className={`button bt-notlike is-danger is-outlined`} onClick={this.onClick}>
					<i className="far fa-thumbs-down" />
					&nbsp;Not like
				</button>
			</div>
		);
	}
}

VoteScorePost.propTypes = {
	id: PropTypes.number
};

export default VoteScorePost;
