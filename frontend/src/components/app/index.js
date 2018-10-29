import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Loader from '../loader';
import Header from '../header';
import Posts from '../posts';
import PostDetail from '../post-detail';

import { setLoader } from '../../actions/global';
import './index.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        {this.props.loader && <Loader />}

        <Router>
          <Route
            render={props => {
              return (
                <Fragment>
                  <Header {...this.props} />
                  <Router>
                    <Switch>
                      <Route
                        exact
                        path="/:category?"
                        render={props => <Posts {...props} {...this.props} />}
                      />
                      <Route
                        exact
                        path="/:category/:post_id"
                        render={props => (
                          <PostDetail {...props} {...this.props} />
                        )}
                      />
                    </Switch>
                  </Router>
                </Fragment>
              );
            }}
          />
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
