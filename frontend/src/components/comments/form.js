import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class formComment extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <Fragment>
        <div className="field">
            <label className="label">User</label>
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
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(formComment)
