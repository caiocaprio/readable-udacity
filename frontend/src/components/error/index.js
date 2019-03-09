import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Master } from '../templates';
import { Link } from 'react-router-dom';
import './index.scss';

class Error extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getPageNotFound = this.getPageNotFound.bind(this);
		this.getError = this.getError.bind(this);
	}

	getPageNotFound() {
		return (
			<Fragment>
				<h1 className="title is-pulled-left">Sorry, page not found...</h1>
			</Fragment>
		);
	}

	getError(error) {
		switch (error) {
			case '404':
				return this.getPageNotFound();

			default:
				return this.getPageNotFound();
		}
	}

	render() {
		const { match: { params: { error_code } } } = this.props;
		return (
			<Master {...this.props}>
				<div className="container">
					<section className="articles">
						<div className="column is-8 is-offset-2">
							<div className="container-title">{this.getError(error_code)}</div>
							<div className="buttons-error">
								<Link className="button is-link" to={`/`}>
									<span class="icon">
										<i class="fas fa-arrow-left" />
									</span>
									back to home
								</Link>
							</div>
						</div>
					</section>
				</div>
			</Master>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
