import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getPost, updateVoteInPost, deletePost } from "../../actions/posts";
import { getCommentsInPost, updateVoteInComment } from "../../actions/comments";
import { Link } from "react-router-dom";
import VoteScorePost from "../vote-score-post";
import Comments from "../comments";
import {Master} from "../templates";
import FormPost from "../posts/form"
import "./index.scss";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
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
    this.deletePost = this.deletePost.bind(this)
    this.onConfirmDelete = this.onConfirmDelete.bind(this)
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

  onConfirmDelete(id, body) {
		confirmAlert({
			title: [ <b>Do you really want to delete?</b> ],
			message: body,
			buttons: [
				{
					label: 'Yes',
					onClick: async () => await this.deletePost(id)
				},
				{
					label: 'No',
					onClick: () => {
						return;
					}
				}
			]
		});
	}

	async deletePost(id) {
    await this.props.deletePost(id);
    
    this.props.history.push({pathname:"/"})
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
                <span class="icon">
                  <i class="fas fa-arrow-left"></i>
                </span>
                  back
                </Link>
                      
              </div>
            </div>
            <div key={id} className="card article">
              <div className="card-content">
                <div className="content ">
                  <div className="buttons-top is-pulled-right">
                    <Link className="button is-white icon" to={`/post/edit/${id}`}>
                      <i class="fas fa-edit"></i>                  
                    </Link>  
                    <button className="button is-white icon" 	onClick={() => this.onConfirmDelete(id, body)}>
                      <i class="fas fa-trash-alt"></i>                 
                    </button>    
                  </div>    
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
  { getPost, getCommentsInPost, updateVoteInPost, updateVoteInComment, deletePost }
)(PostDetail);