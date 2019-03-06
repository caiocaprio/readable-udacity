import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost, updateVoteInPost } from "../../actions/posts";
import { getCommentsInPost, updateVoteInComment } from "../../actions/comments";
import { Link } from "react-router-dom";
import VoteScorePost from "../vote-score-post";
import VoteScoreComment from "../vote-score-comment";

class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: null,
      post: {},
      comments: []
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { post_id }
      }
    } = this.props;

    await this.props.getPost(post_id);
    await this.props.getCommentsInPost(post_id);
  }

  render() {
    const {
      post: {
        category,
        id,
        title,
        voteScore,
        commentCount,
        body,
        author,
        timestamp
      },
      comments
    } = this.props;

    const d = new Date(timestamp);

    return (
      <div className="container">
        <section className="articles">
          <div className="column is-8 is-offset-2">
            <div key={id} className="card article">
              <div className="card-content">
                <div className="content ">
                  <div className="article-header">
                    <h2 className="title article-title">
                      <Link to={`/${category}/${id}`}>{title}</Link>
                    </h2>
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
                      <span>&nbsp;|&nbsp;</span>
                      <span className="comments-count has-text-grey-light">
                        <i className="fa fa-comments" /> {commentCount}{" "}
                        Comentários
                      </span>
                    </div>
                  </div>
                  <div className="article-body">
                    <p>{body}</p>
                  </div>
                  <div className="article-footer">
                    <div className="tags has-addons ">
                      <Link
                        to={`/${category}`}
                        className="tag is-rounded is-info"
                      >
                        {category}
                      </Link>
                    </div>
                    <VoteScorePost {...this.props} id={id} />
                    <h3>Comments</h3>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ CommentsReducer, PostsReducer }) => ({
  ...CommentsReducer,
  ...PostsReducer
});

export default connect(
  mapStateToProps,
  { getPost, getCommentsInPost, updateVoteInPost, updateVoteInComment }
)(PostDetail);
