import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/posts';

function mapStateToProps(state) {
  return {};
}

class Posts extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }

  render() {
    const { posts } = this.props;

    return (
      <Fragment>
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
                commentCount
              } = this.props.posts;
              return (
                <div key={id}>
                  <h2>{title}</h2>
                  <p>{author}</p>
                  <div>{category}</div>
                  <div>{title}</div>
                  <div>{title}</div>
                </div>
              );
            });
          })(posts)}
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  {
    getAllPosts
  }
)(Posts);
