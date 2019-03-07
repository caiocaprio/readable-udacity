import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getPost, updateVoteInPost } from "../../actions/posts";
import { getCommentsInPost, updateVoteInComment } from "../../actions/comments";
import { Link } from "react-router-dom";
import VoteScorePost from "../vote-score-post";
import Comments from "../comments";
import {Master} from "../templates";
import FormPost from "../posts/form"
import "./index.scss";
class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: null,
      edit:false,
      post: {},
      comments: []
    };

    this.onClickEdit = this.onClickEdit.bind(this)
    this.setEdit = this.setEdit.bind(this)
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

  setEdit(edit){
    this.setState({edit:edit})
  }

  onClickEdit(e){
    e.preventDefault();
    this.setState({edit:true})
  }

  render() {
    const {
      post,
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
    console.log('this.state',this.state)

    const {edit} = this.state

    const d = new Date(timestamp);

    return (
      <Master {...this.props}>
        <div className="container">
        <section className="articles">
          <div className="column is-8 is-offset-2">
          
            
            <div className="container-title">
            <h1 className="title is-pulled-left">Post</h1>           
              <div className="buttons ">
                <Link className="button is-link is-pulled-left" to={`/`}>
                  back
                </Link>
                <Link className="button is-link is-pulled-left" to={`/post/edit/${id}`}>
                  edit
                </Link>              
              </div>
            </div>
            <div key={id} className="card article">
              <div className="card-content">
                <div className="content ">
                  <div className="article-header">
                    <h2 className="title article-title">
                      {title}
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
                   
                    <Comments {...this.props}  />
                  </div>
                </div>
              </div>
            </div>
            
          
          </div>
        </section>
      </div>
    
      
      </Master>
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
