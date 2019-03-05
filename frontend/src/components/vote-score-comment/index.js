import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { updateVoteInComment } from "../../actions/comments";
import "./index.scss";

class VoteScoreComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vote: null,
      like: 0,
      id: null,
      notlike: 0,
      mouseEnterNotLike: "",
      mouseEnterLike: ""
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
    document.getElementById("root").focus();
  }

  onClick(e) {
    const { updateVoteInComment } = this.props;

    if (e.target.className.indexOf("bt-notlike") != -1) {
      updateVoteInComment(this.state.id, "downVote");
    } else {
      updateVoteInComment(this.state.id, "upVote");
    }
  }

  render() {
    return (
      <div ref={this.sectionFocusEl} className="box-score-comment">
        <button
          className={`button bt-like is-success is-outlined`}
          onClick={this.onClick}
        >
          <i className="far fa-thumbs-up" />
          &nbsp;Like
        </button>
        &nbsp;
        <button
          className={`button bt-notlike is-danger is-outlined`}
          onClick={this.onClick}
        >
          <i className="far fa-thumbs-down" />
          &nbsp;Not like
        </button>
      </div>
    );
  }
}

export default VoteScoreComment;
