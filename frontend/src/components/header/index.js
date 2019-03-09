import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menu: {
				active: false
			}
		};
		this.onClickExpandMenu = this.onClickExpandMenu.bind(this);
	}

	onClickExpandMenu(e) {
		console.log('click');
		this.setState({ menu: { active: !this.state.menu.active } });
	}
	render() {
		return (
			<nav className="navbar" role="navigation" aria-label="main navigation">
				<div className="container">
					<div className="navbar-brand">
						<a className="navbar-item" href="https://bulma.io">
							<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
						</a>

						<a
							role="button"
							className="navbar-burger burger"
							aria-label="menu"
							aria-expanded="false"
							data-target="navbarBasicExample"
							onClick={this.onClickExpandMenu}
						>
							<span aria-hidden="true" />
							<span aria-hidden="true" />
							<span aria-hidden="true" />
						</a>
					</div>

					<div id="navbarBasicExample" className={`navbar-menu ${this.state.menu.active ? 'is-active' : ''}`}>
						<div className="navbar-start">
							<Link className="navbar-item" to="/">
								Posts
							</Link>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

Header.propTypes = {
	menu: PropTypes.shape({
		active: PropTypes.bool
	})
};

export default Header;
