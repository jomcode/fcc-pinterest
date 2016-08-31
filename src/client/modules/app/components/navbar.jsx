import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

import rootUrl from '../../../config/rooturl';

const loginLink = `${rootUrl}/login/twitter`;

const NavBar = ({ auth, logoutHandler, currentUser }) => {
  const { userId } = currentUser;
  const { isAuthenticated, isFetching } = auth;

  // TODO render loading
  if (isFetching) {
    return (
      <div>
        <nav>
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
