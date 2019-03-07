import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import VoteScoreComment from '../vote-score-comment'
import { Link } from "react-router-dom";

export class Comments extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
      const {comments} = this.props
    return (
      <Fragment>
        <div className="container-title">
            <h3>Comments</h3>
            <div className="buttons ">
            <Link className="button is-link is-pulled-left" to={`/comment/new`}>
                New Comment
            </Link>
            </div>
        </div>
        {comments.map(comment => {
            const {
            author,
            body,
            deleted,
            id,
            parentDeleted,
            parentId,
            timestamp,
            voteScore
            } = comment;
            return (
            <article className="message">
                <div className="message-body">
                <div>{body}</div>
                <span className="author">by {author} </span>
                <span>&nbsp;|&nbsp;</span>
                <i className={`fas fa-star`} />
                <span
                    className={
                    `vote-score ` +
                    (voteScore > 0
                        ? "green"
                        : voteScore == 0
                        ? "grey"
                        : "red")
                    }
                >
                    {" "}
                    {voteScore}
                </span>
                <VoteScoreComment {...this.props} id={id} />
                </div>
                <div className="message-footer" />
            </article>
            );
        })}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
