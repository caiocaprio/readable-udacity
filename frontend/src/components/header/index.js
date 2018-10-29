import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const Header = props => {
  return (
    <Fragment>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              <img
                src="https://bulma.io/images/bulma-logo.png"
                width="112"
                height="28"
              />
            </a>

            <a
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">
                Posts
              </Link>

              <Link className="navbar-item" to="/">
                Categories
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
