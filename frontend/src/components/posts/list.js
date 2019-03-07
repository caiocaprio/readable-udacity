import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllPosts, updateVoteInPost } from "../../actions/posts";
import { getCategories } from "../../actions/categories";
import VoteScorePost from "../vote-score-post";
import Categories from "../categories";
import {Master} from "../templates"
import "./index.scss";

class ListPosts extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      order: null
    };
    this.changeOrder = this.changeOrder.bind(this);
  }

  async componentDidMount() {
    console.log("POSTS:componentDidMount", this.props.match);
    const { getAllPosts, getCategories } = this.props;
    await getAllPosts();
  }

  changeOrder(e) {
    this.setState({ order: e.target.value });
  }

  render() {
    const { posts, categories } = this.props;

    console.log(this.props);

    return (
      <Fragment>
      <Master {...this.props}>      
       <div className="container">
        <section className="articles">
          <div className="column is-8 is-offset-2">
         
           <div className="container-title">
           <h1 className="title is-pulled-left">Posts</h1>
           
            <div className="buttons ">    
              <div className="order is-pulled-right">
                <span>Order by: </span>
                <select className="selectOrder" onChange={this.changeOrder}>
                  <option value="dateAsc">Date Crescent</option>
                  <option value="dateDesc">Date Descending</option>
                  <option value="starAsc">More Stars</option>
                  <option value="starDesc">Less Stars</option>
                </select>
              </div>          
              <Link className="button is-link is-pulled-right" to={`/post/new`}>
                new post
              </Link>
            </div>
           </div>
            
           
            {posts.length > 0 &&
              (posts => {
                posts = posts.filter(post => {
                  if (!post.deleted) {
                    if (this.props.match.params.category) {
                      if (post.category === this.props.match.params.category)
                        return true;
                      else return false;
                    }
                    return true;
                  }
                });
                if (posts.length > 0) {
                  return posts
                    .sort((a, b) => {
                      if (!this.state.order) {
                        return true;
                      } else {
                        switch (this.state.order) {
                          case "dateAsc":
                            return a.timestamp < b.timestamp ? 1 : -1;

                          case "dateDesc":
                            return a.timestamp > b.timestamp ? 1 : -1;

                          case "starAsc":
                            return a.voteScore < b.voteScore ? 1 : -1;

                          case "starDesc":
                            return a.voteScore > b.voteScore ? 1 : -1;

                          default:
                            return null;
                        }
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
                                    <i className="fa fa-comments" />{" "}
                                    {commentCount} Comentários
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
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    });
                }
                return (
                  <div className="card article">
                    <div className="card-content">
                      <div className="content ">
                        <div className="article-header">
                          <h2 className="title article-title">
                            Post not found.
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })(posts)}
          </div>
        </section>
        <Categories {...this.props} />
      </div>
      </Master>
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  CommentsReducer,
  PostsReducer,
  CategoriesReducer
}) => ({
  ...CommentsReducer,
  ...CategoriesReducer,
  ...PostsReducer
});

export default connect(
  mapStateToProps,
  {
    getAllPosts,
    getCategories,
    updateVoteInPost
  }
)(ListPosts);
