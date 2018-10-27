import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {};
}

class Posts extends Component {
  componentDidMount() {
    console.log('componentDidMount:posts', this.props);
  }
  render() {
    return <div />;
  }
}

export default connect(mapStateToProps)(Posts);
