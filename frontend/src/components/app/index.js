import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Loader from '../loader';
import Header from '../header';

import ListPosts from '../posts/list';
import DetailPost from '../posts/detail';
import FormPost from '../posts/form';
import FormComment from '../comments/form';

import { setLoader } from '../../actions/global';
import './index.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

class App extends Component {
	render() {
		return (
			<Fragment>
				{this.props.loader && <Loader />}

				<Router>
					<Route
						render={(props) => {
							return (
								<Fragment>
									<Router>
										<Switch>
											<Route
												exact
												path="/post/:action?/:post_id?"
												render={(props) => <FormPost {...props} {...this.props} />}
											/>
											<Route
												exact
												path="/comment/:action?/:comment_id?"
												render={(props) => <FormComment {...props} {...this.props} />}
											/>
											<Route
												exact
												path="/:category?"
												render={(props) => <ListPosts {...props} {...this.props} />}
											/>
											<Route
												exact
												path="/:category/:post_id"
												render={(props) => <DetailPost {...props} {...this.props} />}
											/>
											<Route
												exact
												path="/"
												render={(props) => <ListPosts {...props} {...this.props} />}
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

const mapStateToProps = ({ GlobalReducer, PostsReducer, CategoriesReducer, CommmentsReducer }) => ({
	...GlobalReducer,
	...PostsReducer,
	...CategoriesReducer,
	...CommmentsReducer
});

export default connect(mapStateToProps, {
	setLoader
})(App);
