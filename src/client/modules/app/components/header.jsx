import React, { Component } from 'react';

import NavBar from './navbar';

const Header = ({ isAuthenticated, logoutHandler, currentUser }) => (
  <header>
    <NavBar
      isAuthenticated={isAuthenticated}
      logoutHandler={logoutHandler}
      currentUser={currentUser}
    />
  </header>
);

export default Header;
