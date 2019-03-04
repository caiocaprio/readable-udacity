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
    if (e.target.className.indexOf("bt-notlike") != -1) {
      if (!this.state.notLikeActive) {
        this.setState({ notLikeActive: "is-active" }, () => {
          updateVoteInComment(this.state.id, "downVote");
        });
      } else {
        this.setState({ notLikeActive: "" }, () => {
          updateVoteInComment(this.state.id, "upVote");
        });
      }
    } else {
      if (!this.state.likeActive) {
        this.setState({ likeActive: "is-active" }, () => {
          updateVoteInComment(this.state.id, "upVote");
        });
      } else {
        this.setState({ likeActive: "" }, () => {
          updateVoteInComment(this.state.id, "downVote");
        });
      }
    }
    this.resetFocus();
  }

  render() {
    return (
      <div ref={this.sectionFocusEl} className="box-score-comment">
        <button
          className={`button bt-like is-success ${
            this.state.likeActive ? this.state.likeActive : "is-outlined"
          }`}
          onClick={this.onClick}
        >
          <i className="far fa-thumbs-up" />
          &nbsp;Like
        </button>
        &nbsp;
        <button
          className={`button bt-notlike is-danger ${
            this.state.notLikeActive ? this.state.notLikeActive : "is-outlined"
          }`}
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
