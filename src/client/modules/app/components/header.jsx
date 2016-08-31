import React, { Component } from 'react';

import NavBar from './navbar';

const Header = ({ isAuthenticated, logoutHandler, userId }) => (
  <header>
    <NavBar
      isAuthenticated={isAuthenticated}
      logoutHandler={logoutHandler}
      userId={userId}
    />
  </header>
);

export default Header;
