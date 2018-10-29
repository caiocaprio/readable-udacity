import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/posts';
import moment from 'moment';

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
                return posts.map((post, index) => {
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
                        <div className="content article-body">
                          <div className="media-content">
                            <h2 className="title article-title">
                              Introducing a new feature for paid subscribers
                            </h2>

                            <div className="">
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
                              <span className="comments-count has-text-grey-light">
                                <i className="fa fa-comments" /> {commentCount}{' '}
                                Comentários
                              </span>
                            </div>
                          </div>
                          <p>{title}</p>
                          <p>{body}</p>
                          <div class="tags has-addons ">
                            <span class="tag is-rounded is-info">
                              {category}
                            </span>
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
