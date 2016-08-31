import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

const NavBar = ({ isAuthenticated, logoutHandler, userId }) => {
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

  const loginLink = process.env.NODE_ENV !== 'production' ?
    'http://127.0.0.1:3030/login/twitter' :
    `${window.location.origin}:${process.env.PORT}/login/twitter`;

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
