import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

import rootUrl from '../../../config/rooturl';

const loginLink = `${rootUrl}/login/twitter`;

const NavBar = ({ isAuthenticated, logoutHandler, currentUser }) => {
  const { userId } = currentUser;
  if (isAuthenticated) {
    return (
      <div>
        <nav>
          <div>
            <a href="#">Pinterestish</a>
            <IndexLink to="/" activeClassName="active-nav">Recent</IndexLink>
            <Link
              to={`/posts/users/${userId}`}
              activeClassName="active-nav"
            >
              Your Posts
            </Link>

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
      <nav>
        <div>
          <a href="#">Pinterestish</a>
          <IndexLink to="/" activeClassName="active-nav">Recent</IndexLink>
          <a href={loginLink}>
            <button>Login via Twitter</button>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
