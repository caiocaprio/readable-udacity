import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Loader from './components/loader';
import Posts from './components/posts';
import './App.css';

import { setLoader } from './actions/global';

class App extends Component {
  render() {
    return (
      <Fragment>
        {this.props.loader && <Loader />}
        <Router>
          <Switch>
            <Route
              exact
              path="/:category?/:post_id?"
              render={props => <Posts {...props} {...this.props} />}
            />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  GlobalReducer,
  PostsReducer,
  CategoriesReducer,
  CommmentsReducer
}) => ({
  ...GlobalReducer,
  ...PostsReducer,
  ...CategoriesReducer,
  ...CommmentsReducer
});

export default connect(
  mapStateToProps,
  {
    setLoader
  }
)(App);
