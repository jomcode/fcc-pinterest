import React from 'react';
import { Link, IndexLink } from 'react-router';

import './navbar.scss';
import rootUrl from '../../../config/rooturl';

const loginLink = `${rootUrl}/login/twitter`;

const NavBar = ({ auth, logoutHandler, currentUser }) => {
  const { userId } = currentUser;
  const { isAuthenticated, isFetching } = auth;

  // TODO render loading
  if (isFetching) {
    return (
      <div>
        <nav className="header-navbar">
          <div>
            <a href="#">Pinterestish</a>
            <span>Loading...</span>
          </div>
        </nav>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div>
        <nav className="header-navbar">
          <div>
            <a href="#">Pinterestish</a>
            <IndexLink to="/" activeClassName="active-nav">Recent</IndexLink>
            <Link
              to={`/posts/users/${userId}`}
              activeClassName="active-nav"
            >
              Your Posts
            </Link>
          </div>

          <div>
            <Link
              to="/posts/create"
              activeClassName="active-nav"
            >
              Create Post
            </Link>

            <button onClick={logoutHandler}>Logout</button>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div>
      <nav className="header-navbar">
        <div>
          <a href="#">Pinterestish</a>
          <IndexLink to="/" activeClassName="active-nav">Recent</IndexLink>
        </div>

        <div>
          <a href={loginLink}>
            <button>Login via Twitter</button>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
