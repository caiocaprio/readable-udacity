import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {addCommentInPost, updateComment} from '../../actions/comments'
import { Link } from "react-router-dom"; 
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
export class formComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: {
                id: '',
                timestamp: 0,
                author: '',
                body: '',
                parentId: '',            
            },
            author: false,
            body: false
        };
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }
        
  validate() {
    const { author, body } = this.state;
  
    return author && body;
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value !== "",
      comment: { ...this.state.comment, [e.target.name]: e.target.value }
    });
  }

  
  static getDerivedStateFromProps(nextProps,prevState) {
    if(nextProps.post.id != prevState.comment.parentId) {
      return {
        comment:{...prevState.comment,parentId:nextProps.post.id},
        author:nextProps.comment.author != '' ? true : false,
        body:nextProps.comment.body != '' ? true : false,
      }
    }
    return null
  }

  async submitComment(){
    if (this.validate()) {
        const { comment } = this.state;
        
        if (comment.id == "") {
          comment.id = Math.random()
          .toString(36)
          .substr(2, 9);
          comment.timestamp = Date.now();
  
          const response = await this.props.addCommentInPost(comment);
          
  
          this.setState({ 
              comment: {
                  id: '',
                  timestamp: 0,
                  author: '',
                  body: '',
                  parentId: '',            
              },
              author: false,
              body: false}
          )
  
          alert('New comment successfully registered!')
          
        } else {
          // const response =  await this.props.updateComment(comment.id, comment.title, comment.body);
          alert('Updated with successfully!')
          // this.props.history.push({pathname:`/${comment.category}/${comment.id}`})
        }
      }
  }

   onClickSubmit(e) {
    e.preventDefault();
    confirmAlert({
        title: [<b>{this.state.comment.author}</b>,`, confirm to submit ?`],
        message: [<b>{this.state.comment.body}</b>],
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.submitComment()
          },
          {
            label: 'No',
            onClick: () => {return}
          }
        ]
      })
   
    
  }

  render() {
     const {comment:{author, body}} = this.state
    return (
      <div className="is-clearfix">
        <div className="field">
            <label className="label">Author</label>
            <div className="control">
                <input
                className="input"
                name="author"
                type="text"
                placeholder=""
                onChange={this.onChange}
                value={author}
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
            <div className="field is-grouped is-pulled-right ">
                <div className="control ">
                    <button className="button is-link" onClick={this.onClickSubmit}>
                    Submit
                    </button>
                </div>
            </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
    addCommentInPost,
    updateComment
}

export default connect(mapStateToProps, mapDispatchToProps)(formComment)
