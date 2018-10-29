import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/posts';
import StarRatingComponent from 'react-star-rating-component';

function mapStateToProps(state) {
  return {};
}

class Posts extends Component {
  componentDidMount() {
    console.log('POSTS:componentDidMount');
    this.props.getAllPosts();
  }

  render() {
    const { posts } = this.props;

    return (
      <div className="container">
        <section className="articles">
          <div className="column is-8 is-offset-2">
            <h1 className="title">Posts</h1>
            {posts.length > 0 &&
              (posts => {
                return posts
                  .filter(post => {
                    if (!post.deleted) {
                      if (this.props.match.params.category) {
                        if (post.category === this.props.match.params.category)
                          return true;
                        else return false;
                      }
                      return true;
                    }
                  })
                  .map((post, index) => {
                    const {
                      author,
                      title,
                      id,
                      body,
                      category,
                      voteScore,
                      deleted,
                      timestamp,
                      commentCount
                    } = post;

                    const d = new Date(timestamp);
                    return (
                      <div key={id} className="card article">
                        <div className="card-content">
                          <div className="content ">
                            <div className="article-header">
                              <h2 className="title article-title">
                                <Link to={`/${category}/${id}`}>{title}</Link>
                              </h2>
                              <div className="box-info-post">
                                <span className="date-posted">
                                  Posted on{' '}
                                  {d.getFullYear() +
                                    '/' +
                                    (d.getMonth() + 1) +
                                    '/' +
                                    d.getDate()}
                                </span>
                                <span>&nbsp;|&nbsp;</span>
                                <span className="author">by {author} </span>
                                <span>&nbsp;|&nbsp;</span>
                                <span
                                  className={
                                    `vote-score ` +
                                    (voteScore > 0
                                      ? 'green'
                                      : voteScore == 0
                                        ? 'grey'
                                        : 'red')
                                  }
                                >
                                  {voteScore} star
                                  {voteScore > 1 || voteScore < -1 ? 's' : ''}
                                </span>
                                <span>&nbsp;|&nbsp;</span>
                                <span className="comments-count has-text-grey-light">
                                  <i className="fa fa-comments" />{' '}
                                  {commentCount} Comentários
                                </span>
                              </div>
                              <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                value={voteScore > 0 ? voteScore : 0}
                              />
                            </div>
                            <div className="article-body">
                              <p>{body}</p>
                            </div>
                            <div className="article-footer">
                              <div className="tags has-addons ">
                                <span className="tag is-rounded is-info">
                                  {category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
              })(posts)}
          </div>
        </section>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {
    getAllPosts
  }
)(Posts);
