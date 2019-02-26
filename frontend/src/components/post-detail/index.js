import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../actions/posts';
import { getCommentsInPost } from '../../actions/comments';
import { Link } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    getPost,
    getCommentsInPost,
  }; 
}

class PostDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      order:null,
      post:{
        author: '',
        body: '',
        category: '',
        commentCount: 0,
        deleted: false,
        id: '',
        timestamp: 0,
        title: '',
        voteScore: 0,
      },
      comments: [],      
    }

  } 

  async componentDidMount() {
    const { match: { params: { post_id } } } = this.props
    const post = await this.props.getPost(post_id)
    const comments = await this.props.getCommentsInPost(post_id);
    console.log(await this.props.getCommentsInPost(this.props.match.params.post_id))
    // console.log(post)
    this.setState({post, comments});
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
    } = this.state

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
                      <i
                        className={`fas fa-star`}
                      />
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
                        {' '}
                        {voteScore}
                      </span>
                      <span>&nbsp;|&nbsp;</span>
                      <span className="comments-count has-text-grey-light">
                        <i className="fa fa-comments" />{' '}
                        {commentCount} Comentários
                      </span>
                    </div>
                    
                  </div>
                  <div className="article-body">
                      <p>{body}</p>
                  </div>
                  <div className="article-footer">
                    <div className="tags has-addons ">
                      <Link to={`/${category}`} className="tag is-rounded is-info">
                        {category}
                      </Link>
                    </div>
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
                        voteScore,
                      } = comment
                      return (
                        <article className="message">
                          <div className="message-body">
                          <b>{`${author} `}</b>{body}
                          </div>
                        </article>
                      )
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

export default connect(mapStateToProps)(PostDetail);
