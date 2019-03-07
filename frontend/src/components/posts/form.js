import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addPost, updatePost, getPost } from "../../actions/posts";
import { getCategories } from "../../actions/categories";
import {Master} from "../templates"
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
        id: '',
        timestamp: 0,
        title: '',
        body: '',
        author: "Pelé",
        category: '',
      },
      category: false,
      title: false,
      body: false
    };
    this.onClickCancel = this.onClickCancel.bind(this)
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    console.log(this.props);
    if (!this.props.categories.length) {
      await this.props.getCategories();
    }

    if(this.props.match.params.action == 'edit'){
      if(this.props.post && this.props.post.id != ''){
        this.setState({
          post:this.props.post,
          category:this.props.post.category != '' ? true : false,
          title:this.props.post.title != '' ? true : false,
          body:this.props.post.body != '' ? true : false,
        })
      }else{
        const {match:{params:{post_id}}} = this.props

        if(post_id){
          await this.props.getPost(post_id)
        }
      }
    }
  }

  static getDerivedStateFromProps(nextProps,prevState) {
    if(nextProps.post.id != prevState.post.id && nextProps.match.params.action == 'edit') {
      return {
        post:nextProps.post,
        category:nextProps.post.category != '' ? true : false,
        title:nextProps.post.title != '' ? true : false,
        body:nextProps.post.body != '' ? true : false,
      }
    }
    return null
  }

  onClickCancel(e){
    const {post:{id, category}} = this.state
    if(id !== ''){
      this.props.history.push({pathname:`/${category}/${id}`})
    }else{
      this.props.history.push({pathname:`/`})
    }
  }

  validate() {
    const { category, title, body } = this.state;
  
    return title && category && body;
  }

  onChange(e) {
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
      
      
      if (post.id == "") {
        post.id = Math.random()
        .toString(36)
        .substr(2, 9);
        post.timestamp = Date.now();

        const response = await this.props.addPost(post);
        alert('New post successfully registered!')
        this.props.history.push({pathname:'/'})
      } else {
        const response =  await this.props.updatePost(post.id, post.title, post.body);
        alert('Updated with successfully!')
        this.props.history.push({pathname:`/${post.category}/${post.id}`})
      }
    }
    console.log("click", this.state);
  }

  getForm(){
    
      const { post: { title, body, category, id } } = this.state;
      const {categories} = this.props
   
      return (
        <Fragment>
           <div class="field">
            <label class="label">Category</label>
            <div class="control">
              <div class="select">
                <select name="category" onChange={this.onChange} value={category} disabled={id!=''}>
                  <option>--</option>
                  {(() => {
                    return Object.keys(categories).map((e, i) => {
                      return (
                        <option value={categories[i].path} >
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
                value={title}
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
                value={body}
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
              <button className="button is-text" onClick={this.onClickCancel}>
                Cancel
              </button>
            </div>
          </div>
        </Fragment>
      )
    
  }

  render() {
    
    const { post: {id} } = this.state;

    return   (
    <Master {...this.props}>
      <div className="container">
        <section className="articles">
          <div className="column is-8 is-offset-2">
            <div className="container-title">
              <h1 className="title is-pulled-left">{id == '' ? 'New' : 'Edit'} Post</h1>            
              <div className="buttons ">                      
                <button className="button is-link is-pulled-right" onClick={this.onClickCancel}>
                  back
                </button>
              </div>
            </div>
            {this.getForm()}
          </div>
        </section>
      </div>
    </Master>
    )
     
    
  }
}

export default connect(
  mapStateToProps,
  { addPost, updatePost, getCategories,getPost }
)(CreatePost);
