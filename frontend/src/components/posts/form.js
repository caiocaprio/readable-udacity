import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addPost, updatePost } from "../../actions/posts";
import { getCategories } from "../../actions/categories";

function mapStateToProps({ CategoriesReducer }) {
  return {
    ...CategoriesReducer
  };
}

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        id: null,
        timestamp: 0,
        title: null,
        body: null,
        author: "Pelé",
        category: null,
        voteScore: 0,
        deleted: false,
        commentCount: 0
      },
      category: false,
      title: false,
      body: false
    };

    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    console.log(this.props);
    if (!this.props.categories.length) {
      await this.props.getCategories();
    }
  }

  validate() {
    const { category, title, body } = this.state;
    return title && category && body;
  }

  onChange(e) {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value !== "",
      post: { ...this.state.post, [e.target.name]: e.target.value }
    });
  }

  async onClickSubmit(e) {
    e.preventDefault();
    console.log("click", this.props);
    if (this.validate()) {
      const { post } = this.state;
      post.timestamp = new Date().getTime();
      post.id = Math.random()
        .toString(36)
        .substr(2, 9);
      if (post.id !== "") {
        const response = await this.props.addPost(post);
        console.log("response", response);
      } else {
        await this.props.updatePost(post);
      }
    }
    console.log("click", this.state);
  }

  render() {
    const { categories } = this.props;
    console.log(categories);
    return (
      <div className="container">
        <section className="articles">
          <div className="column is-8 is-offset-2">
            <h1 className="title">New Post</h1>
            <div class="field">
              <label class="label">Category</label>
              <div class="control">
                <div class="select">
                  <select name="category" onChange={this.onChange}>
                    <option>--</option>
                    {(() => {
                      return Object.keys(categories).map((e, i) => {
                        return (
                          <option value={categories[i].path}>
                            {categories[i].name}
                          </option>
                        );
                      });
                    })()}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  name="title"
                  type="text"
                  placeholder=""
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Body</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="body"
                  placeholder=""
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" onClick={this.onClickSubmit}>
                  Submit
                </button>
              </div>
              <div className="control">
                <Link className="button is-text" to={"/"}>
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { addPost, updatePost, getCategories }
)(CreatePost);
